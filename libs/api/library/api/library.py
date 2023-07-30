from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList, UpdateRqst
from ...deps import Database
from bson import ObjectId

db = Database.getInstance().db
router = APIRouter()

@router.post('/practice')
def create_reading(rqst: PracticeRqst):
    practice_collection = db["Practice"]
    result = practice_collection.find_one({"_id": ObjectId(rqst.userID)})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        word_list.add_word(doc, get_image(doc)) # Call api or something to generate img url
    return word_list


@router.post('/vocab')
def get_vocab(rqst: VocabRqst):
    vocab_collection = db["Vocabulary"]
    result = vocab_collection.find_one({"_id": ObjectId(rqst.userID)})
    if result is None:
        return None
    word_list = WordList()
    for doc in result["words"]:
        word_list.add_word(doc, get_image(doc)) # Call api or something to generate img url
    return word_list

@router.post('/practice/remove')
def remove_practice(rqst: UpdateRqst):
    practice_collection = db["Practice"]
    document = practice_collection.find_one({"_id": ObjectId(rqst.userID), "words": rqst.word})
    if document:
        practice_collection.update_one(
            {"_id": ObjectId(rqst.userID)},
            {"$pull": {"words": rqst.word}}
        )
        return {"status":"success"}
    return {"status":"failed"}

def check_duplicate_words(collection, user_id, word):
    document = collection.find_one({"_id": ObjectId(user_id), "words": word})
    return document is not None

@router.post('/practice/add')
def add_practice(rqst: UpdateRqst):
    practice_collection = db["Practice"]
    if check_duplicate_words(practice_collection, ObjectId(rqst.userID), rqst.word):
        return {"status": "failed", "message": "Word already exists in the practice collection."}
    practice_collection.update_one(
        {"_id": ObjectId(rqst.userID)},
        {"$addToSet": {"words": rqst.word}},
        upsert=True
    )
    return {"status": "success"}


@router.post('/vocab/add')
def add_vocab(rqst: UpdateRqst):
    vocab_collection = db["Vocabulary"]
    if check_duplicate_words(vocab_collection, rqst.userID, rqst.word):
        return {"status": "failed", "message": "Word already exists in the vocabulary collection."}
    vocab_collection.update_one(
        {"_id": ObjectId(rqst.userID)},
        {"$addToSet": {"words": rqst.word}},
        upsert=True
    )
    return {"status": "success"}


def get_image(word: str):
    return "data:image/jpeg;base64,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YFlq6rGqr1q44+ampZJGaIa1nEtPQfDyUDahAuoquMHFVnYmTAV3HFrfbEMzniITVHwM16T6T+kX4kipVmnQz4PqDg3g3/l4cRQ2JQptIe8b7tJ/SP8A11PVeyw+3DxXWwdHPnJ+FPL1U24h7XCU6dNjadNoaxohrRkApw9eVobWnVX6W0JXRVHc3klc2ni1YbXQWpWVA2qtw9BIi1lZlBlFiVlAREQEREBERBgrRzlsVo4IIaj1TrVFcexQPooORiXFcfFUiV6aph1Xfg0HisXgC5cevsKTK+ivwHJQu2dyQfOzsmoMnu8Son7KqfuK+iO2aOCidszko/RxzO+2PxDO5fPTsup+53itf9IdqSvoB2XyWp2XySMOOPFY/BuXgm7FVmjsqNF7T/TOSyNmclvERHhh5ijhCFeo0Cu63Z3JSswCyOdh2FdHDyp2YRWGYdBmi4q3Teo2UlMxiCdj1M16ga1StCCdrluHKIBbhBKCsrQLZBsiwFlAREQEREGIWIWyINC1alilWIQQmktDRVmEhBTNBaHDq9CbqDnnDLU4VdHdWNxBzThVqcLyXU3Fj7aDl/2qf2q6f20+2g5n9ss/266X21j7aCgMOthRV37azuIKYpLcU1Z3FncQQBi3DVLurMINA1bALaFmEGIWUhZQEREBERAREQEREBERAREQEREBERAWIRECEhEQISERAhIRECEhEQISERBlERAREQEREH//2Q=="
