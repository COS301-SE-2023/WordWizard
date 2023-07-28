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
    print(f"{updtProgress=}")
    progress_collection = db['Progress']
    progress = progress_collection.find_one({'_id': updtProgress.childId})

    # Update the data
    # Update level_scores
    progress.level_scores.append(updtProgress.progress.score)
    # Update Total Words
    progress.total_words += len(updtProgress.progress.content.passage) - updtProgress.progress.incorrect_words
    # Update Incorrect_words_by_level
    progress.incorrect_words_by_level.append(updtProgress.progress.incorrect_words)
    # Update Average Score
    for score in progress.level_scores:
        progress.average_score += score
    progress.average_score = progress.average_score / len(progress.level_scores)
    # Update Highest Score
    if updtProgress.progress.score > progress.highest_score:
        progress.highest_score = updtProgress.progress.score
    
    # Update Progress History
    newScore = {
        "level": updtProgress.progress.level,
        "score": updtProgress.progress.score,
        "completed": updtProgress.progress.content.done,
        "date" : updtProgress.progress.date
    }
    progress.progress_history.append(newScore)

    # Find awards earned
    awards = progress.awards

    # Level Master
    lvlMaster = awards.get("Level Master")
    for award in lvlMaster:
        if award["goal"] <= len(updtProgress.progress.level_scores):
            award["completed"] = True

    # Word Learner
    wordLearner = awards.get("Word Learner")
    for award in wordLearner:
        if award["goal"] <= progress.total_words:
            award["completed"] = True

    Practice_collection = db['Practice']
    Practice = Practice_collection.find_one({'_id': updtProgress.childId})

    # Practice Enthusiast
    practiceEnth = awards.get("Practice Enthusiast")
    for award in practiceEnth:
        if award["goal"] <= len(Practice.words):
            award["completed"] = True

    Vocabulary_collection = db['Vocabulary']
    Vocabulary = Vocabulary_collection.find_one({'_id': updtProgress.childId})

    # Vocabulary Builder
    vocabBuilder = awards.get("Vocabulary Builder")
    for award in vocabBuilder:
        if award["goal"] <= len(Vocabulary.words):
            award["completed"] = True

    # Update awards object
    awards["Level Master"] = lvlMaster
    awards["Word Learner"] = wordLearner
    awards["Practice Enthusiast"] = practiceEnth
    awards["Vocabulary Builder"] = vocabBuilder

    progress.awards = awards

    # Update object in DB based on updated object
    progress_collection.insert_one(progress)
    return {"status": "success"}
    
    
    