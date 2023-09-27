from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList, UpdateRqst
from ...deps import Database
from bson import ObjectId

db = Database.getInstance().db
router = APIRouter()


@router.post("/practice")
def create_reading(rqst: PracticeRqst):
    practice_collection = db["Practice"]
    result = practice_collection.find_one({"_id": ObjectId(rqst.userID)})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        if isinstance(doc, str):
            word_list.add_word(doc, get_image(doc))
        else:
            word_list.add_word(doc["word"], get_image(doc["word"]))
    return word_list


@router.post("/vocab")
def get_vocab(rqst: VocabRqst):
    vocab_collection = db["Vocabulary"]
    result = vocab_collection.find_one({"_id": ObjectId(rqst.userID)})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        if isinstance(doc, str):
            word_list.add_word(doc, get_image(doc))
        else:
            word_list.add_word(doc["word"], get_image(doc["word"]))
    return word_list


@router.post("/practice/remove")
def remove_practice(rqst: UpdateRqst):
    practice_collection = db["Practice"]
    document = practice_collection.find_one(
        {"_id": ObjectId(rqst.userID), "words": rqst.word}
    )
    if document:
        practice_collection.update_one(
            {"_id": ObjectId(rqst.userID)}, {"$pull": {"words": rqst.word}}
        )
        return {"status": "success"}
    return {"status": "failed"}


def check_duplicate_words(collection, user_id, word):
    document = collection.find_one({"_id": ObjectId(user_id), "words": word})
    return document is not None


@router.post("/practice/add")
def add_practice(rqst: UpdateRqst):
    practice_collection = db["Practice"]
    if check_duplicate_words(practice_collection, ObjectId(rqst.userID), rqst.word):
        return {
            "status": "failed",
            "message": "Word already exists in the practice collection.",
        }
    practice_collection.update_one(
        {"_id": ObjectId(rqst.userID)}, {"$addToSet": {"words": rqst.word}}, upsert=True
    )
    return {"status": "success"}


@router.post("/vocab/add")
def add_vocab(rqst: UpdateRqst):
    vocab_collection = db["Vocabulary"]
    if check_duplicate_words(vocab_collection, rqst.userID, rqst.word):
        return {
            "status": "success",
            "message": "Word already exists in the vocabulary collection.",
        }
    vocab_collection.update_one(
        {"_id": ObjectId(rqst.userID)}, {"$addToSet": {"words": rqst.word}}, upsert=True
    )
    return {"status": "success"}


def get_image(word: str):
    return "assets/reading/dog.png"
