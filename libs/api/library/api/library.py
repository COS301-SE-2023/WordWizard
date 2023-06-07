from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList, UpdateRqst
import os
from dotenv import load_dotenv
from pymongo import MongoClient
load_dotenv()

router = APIRouter()
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]


@router.post('/practice')
def create_reading(rqst: PracticeRqst):
    practice_collection = db["Practice"]
    result = practice_collection.find_one({"child_id": rqst.userID})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        word_list.add_word(doc, '') # Call api or something to generate img url
    return word_list


@router.post('/vocab')
def get_vocab(rqst: VocabRqst):
    vocab_collection = db["Vocabulary"]
    result = vocab_collection.find_one({"child_id": rqst.userID})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        word_list.add_word(doc, '') # Call api or something to generate img url
    return word_list

@router.post('/practice/remove')
def remove_practice(rqst: UpdateRqst):
    practice_collection = db["Practice"]
    document = practice_collection.find_one({"child_id": rqst.userID, "words": rqst.word})
    if document:
        vocab_collection = db["Vocabulary"]
        practice_collection.update_one(
            {"child_id": rqst.userID},
            {"$pull": {"words": rqst.word}}
        )
        vocab_collection.update_one(
            {"child_id": rqst.userID}, 
            {"$addToSet": {"words": rqst.word}},
            upsert=True
        )
        return {"status":"success"}
    return {"status":"failed"}   

@router.post('/practice/add') 
def add_practice(rqst: UpdateRqst):
    practice_collection = db["Practice"]
    document = practice_collection.find_one({"child_id": rqst.userID})
    if document and rqst.word not in document["words"]:
        practice_collection.update_one(
            {"child_id": rqst.userID},
            {"$addToSet": {"words": rqst.word}},
            upsert=True
        )
        return {"status": "success"}
    return {"status": "failed"}

@router.post('/vocab/add') 
def add_practice(rqst: UpdateRqst):
    vocab_collection = db["Vocabulary"]
    document = vocab_collection.find_one({"child_id": rqst.userID})
    if document and rqst.word not in document["words"]:
        vocab_collection.update_one(
            {"child_id": rqst.userID},
            {"$addToSet": {"words": rqst.word}},
            upsert=True
        )
        return {"status": "success"}
    return {"status": "failed"}