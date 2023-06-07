from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList, UpdateVocab
import os
from dotenv import load_dotenv
from pymongo import MongoClient
load_dotenv()

router = APIRouter()
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]


@router.post('/practice')
def create_reading(practice: PracticeRqst):
    practice_collection = db["Practice"]
    result = practice_collection.find_one({"child_id": practice.userID})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        word_list.add_word(doc, '') # Call api or something to generate img url
    return word_list


@router.post('/vocab')
def get_vocab(vocab: VocabRqst):
    vocab_collection = db["Vocabulary"]
    result = vocab_collection.find_one({"child_id": vocab.userID})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        word_list.add_word(doc, '') # Call api or something to generate img url
    return word_list

@router.post('/vocab/add')
def add_vocab(rqst: UpdateVocab):
    practice_collection = db["Practice"]
    result = practice_collection.find_one({"child_id": rqst.userID, "words": rqst.word})
    print(result)
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        print(doc) # Call api or something to generate img url
    return word_list