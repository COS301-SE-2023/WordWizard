from fastapi import APIRouter
from ..util.stage_models import LevelRequest
from ...deps import Database
db = Database.getInstance().db

router = APIRouter()

@router.post("/get-levels")
def create_reading(rqst: LevelRequest):
    progress_collection = db["Progress"]
    result = progress_collection.find_one({"_id": rqst.progress_id})
    if result:
        return result.get("progress_history")
    return {"message": "Progress not found"}
