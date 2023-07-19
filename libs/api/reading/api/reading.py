from fastapi import APIRouter
from ..util.reading_models import PassageRqst, Content, Word
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
def update_progress()