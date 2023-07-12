from fastapi import APIRouter
from ..util.statistics_models import StatisticsReq
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
from bson import ObjectId
load_dotenv()

router = APIRouter()

connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]

@router.post('/')
def get_stats(rqst: StatisticsReq):
    collection = db["Progress"]
    user = collection.find_one(
        {"_id": ObjectId(rqst.child_id)}, 
        projection={
            "_id": 0,
            "total_words": 1, 
            "incorrect_words_by_level": 1, 
            "average_score": 1, 
            "highest_score": 1, 
            "progress_history": 1
        }
    )
    return user