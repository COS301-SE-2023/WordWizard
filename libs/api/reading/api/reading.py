from fastapi import APIRouter
from ..util.reading_models import PassageRqst, Content, Word, Progress, UpdateProgressRqst
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
from bson import ObjectId
load_dotenv()

client = MongoClient(os.getenv("MONGODB_CONNECTION_STRING"))
db = client["WordWizardDB"]
router = APIRouter()

@router.post('/passage')
def create_reading(reading: PassageRqst):
    lesson_collection = db['Lessons']
    lesson = lesson_collection.find_one({'level':reading.level})
    passage = (lesson['part3'])['passage'].split()
    words = [Word(word=word, correct=None) for word in passage]
    words[passage.index((lesson['part1'])['hard_word'])].imageURL = (lesson['part1'])['image']
    words[passage.index((lesson['part2'])['hard_word'])].imageURL = (lesson['part2'])['image']
    data = Content(passage=words, focusWordsIndex=[passage.index((lesson['part1'])['hard_word']), passage.index((lesson['part2'])['hard_word'])])
    return data


@router.post('/update-progress')
def update_progress(updtProgress: UpdateProgressRqst):
    progress_collection = db['Progress']
    progress = progress_collection.find_one({'_id': ObjectId(updtProgress.child_id)})

    if progress:
        if "level_scores" in progress:
            progress["level_scores"][str(updtProgress.progress.level)] = updtProgress.progress.score
        else:
            progress["level_scores"] = {str(updtProgress.progress.level): updtProgress.progress.score}
        
        if "total_words" in progress:
            progress["total_words"] += len(updtProgress.progress.content) - updtProgress.progress.incorrect_words
        else:
            progress["total_words"] = len(updtProgress.progress.content) - updtProgress.progress.incorrect_words
        
        if "incorrect_words_by_level" in progress:
            progress["incorrect_words_by_level"][str(updtProgress.progress.level)] = updtProgress.progress.incorrect_words
        else:
            progress["incorrect_words_by_level"] = {str(updtProgress.progress.level): updtProgress.progress.incorrect_words}
        for score in progress["level_scores"]:
            progress["average_score"] += int(score)

        if updtProgress.progress.score > progress["highest_score"]:
            progress["highest_score"] = updtProgress.progress.score

        newScore = {
            "level": updtProgress.progress.level,
            "score": updtProgress.progress.score,
            "completed": True,
            "date" : updtProgress.progress.date
        }
        progress["progress_history"].append(newScore)
    
        awards = progress["awards"]
        lvlMaster = awards.get("Level Master")
        # level_master_awards
        if lvlMaster  and isinstance(lvlMaster , dict):
            for award_name, award_details in lvlMaster .items():
                if award_details["goal"] <= len(progress["level_scores"]):
                    award_details['completed'] = True

        #Word learner
        wordLearner = awards.get("Word Learner")
        if wordLearner and isinstance(wordLearner, dict):
            for award_name, award_details in wordLearner.items():
                if award_details["goal"] <= progress["total_words"]:
                    award_details["completed"] = True
        #Practcice enthusiast
        practiceEnth = awards.get("Practice Enthusiast")
        if practiceEnth and isinstance(practiceEnth, dict):
            for award_name, award_details in practiceEnth.items():
                award_details['completed'] = True
        #vocab builder
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

        progress_collection.update_one({'_id': ObjectId(updtProgress.child_id)}, {"$set": progress})
    return {"status": "success"}
    
    
def add_practice(userID, word):
    practice_collection = db["Practice"]
    if check_duplicate_words(practice_collection, userID, word):
        return False
    practice_collection.update_one(
        {"_id": userID},
        {"$addToSet": {"words": word}},
        upsert=True
    )
    return True

def add_vocab(userID, word):
    vocab_collection = db["Vocabulary"]
    if check_duplicate_words(vocab_collection, userID, word):
        return False
    vocab_collection.update_one(
        {"_id": userID},
        {"$addToSet": {"words": word}},
        upsert=True
    )
    return True

def check_duplicate_words(collection, user_id, word):
    document = collection.find_one({"_id": user_id, "words": word})
    return document is not None