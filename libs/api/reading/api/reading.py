from fastapi import APIRouter
from ..util.reading_models import PassageRqst, Content, Word, Progress, UpdateProgressRqst
from ..util.markov import MarkovChain
from ..util.img import get_image
from ..util.helper import get_prefixes_suffixes, find_phonotactics, count_syllables
from bson import ObjectId
from ...deps import Database
import random
from ..util.recomended import query

db = Database.getInstance().db
router = APIRouter()
markov = MarkovChain()

@router.post('/passage')
def create_reading(reading: PassageRqst):
    print("💯")
    words = [Word(word=word, imageURL="img", correct=None) for word in markov.generate_passage(reading.level * 3, priority_words=query(reading.level)).split()]
    content = Content(passage=words, focusWordsIndex=random.sample(range(len(words)), k=2))
    for s in content.focusWordsIndex:
        content.passage[s].imageURL = get_image()
    return content

@router.post('/update-progress')
def update_progress(updtProgress: UpdateProgressRqst):
    # Get the current progress from DB
    progress_collection = db['Progress']
    progress = progress_collection.find_one({'_id': ObjectId(updtProgress.child_id)})

    print("Level ", updtProgress.progress.level)
    print("Score: ", updtProgress.progress.score)

    # UPDATE THE VALUES 
    if progress:
        # Level score
        if "level_scores" in progress:
            progress["level_scores"][str(updtProgress.progress.level)] = updtProgress.progress.score
        else:
            progress["level_scores"] = {str(updtProgress.progress.level): updtProgress.progress.score}

        # Total words
        if "total_words" in progress:
            progress["total_words"] += len(updtProgress.progress.content) - updtProgress.progress.incorrect_words
        else:
            progress["total_words"] = len(updtProgress.progress.content) - updtProgress.progress.incorrect_words

        # Incorrect words
        if "incorrect_words_by_level" in progress:
            progress["incorrect_words_by_level"][str(updtProgress.progress.level)] = updtProgress.progress.incorrect_words
        # else:
        #     progress["incorrect_words_by_level"] = {str(updtProgress.progress.level): updtProgress.progress.incorrect_words}

        # AVG score
        progress["average_score"] = 0
        for lvl in progress["level_scores"]:
            # print(progress["level_scores"][lvl]) 
            progress["average_score"] += int(progress["level_scores"][lvl])
        progress["average_score"] = progress["average_score"]/len(progress["level_scores"])

        # Highest score
        if progress["highest_score"] == 0 or updtProgress.progress.score > progress["highest_score"]:
            progress["highest_score"] = updtProgress.progress.score

        # Progress history
        newScore = {
            "level": updtProgress.progress.level,
            "score": updtProgress.progress.score,
            "completed": True,
            "date" : updtProgress.progress.date
        }
        progress["progress_history"].append(newScore)

        # Awards
        awards = progress["awards"]
        lvlMaster = awards.get("Level Master")
        if lvlMaster  and isinstance(lvlMaster , dict):
            for award_name, award_details in lvlMaster .items():
                if award_details["goal"] <= len(progress["level_scores"]):
                    award_details['completed'] = True
        wordLearner = awards.get("Word Learner")
        if wordLearner and isinstance(wordLearner, dict):
            for award_name, award_details in wordLearner.items():
                if award_details["goal"] <= progress["total_words"]:
                    award_details["completed"] = True
        practiceEnth = awards.get("Practice Enthusiast")
        if practiceEnth and isinstance(practiceEnth, dict):
            for award_name, award_details in practiceEnth.items():
                award_details['completed'] = True
        vocabBuilder = awards.get("Vocabulary Builder")
        if vocabBuilder and isinstance(vocabBuilder, dict):
            for award_name, award_details in vocabBuilder.items():
                if award_details["goal"] <= progress["total_words"]:
                    award_details["completed"] = True
        awards["Level Master"] = lvlMaster
        awards["Word Learner"] = wordLearner
        awards["Practice Enthusiast"] = practiceEnth
        awards["Vocabulary Builder"] = vocabBuilder
        progress["awards"] = awards
        for word in updtProgress.progress.content:
            if word.correct:
                # print(word.correct)
                add_vocab(updtProgress.child_id, word.word)
            if not word.correct or word.correct == None:
                # print(word.correct)
                add_practice(updtProgress.child_id, word.word, updtProgress.progress.level)
        progress_collection.update_one({'_id': ObjectId(updtProgress.child_id)}, {"$set": progress})
        return {"status": "success"}
    return {"status": "failed"}
  
def add_practice(userID, word, level=1):
    if check_duplicate_words(db["Practice"], userID, word):
        return False
    pref = get_prefixes_suffixes(word)
    db["Practice"].update_one(
        {"_id": ObjectId(userID)},
        {"$addToSet": {"words": 
            {
                "word": word,
                "phonotactics": find_phonotactics(word),
                "prefixes": pref[0],
                "suffixes": pref[1],
                "syllables": count_syllables(word),
                "level": level
            }
        }},
        upsert=True
    )
    return True

def add_vocab(userID, word):
    if check_duplicate_words(db["Vocabulary"], userID, word):
        return False
    db["Vocabulary"].update_one(
        {"_id": ObjectId(userID)},
        {"$addToSet": {"words": word}},
        upsert=True
    )
    return True

def check_duplicate_words(collection, user_id, word):
    document = collection.find_one({"_id": ObjectId(user_id), "words": word})
    return document is not None