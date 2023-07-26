from fastapi import APIRouter
from ..util.statistics_models import StatisticsReq
from bson import ObjectId
from ...deps import Database
db = Database.getInstance().db
router = APIRouter()

@router.post('/get-stats')
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