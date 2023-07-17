from fastapi import APIRouter
from ..util.stage_models import LevelRequest
import os
from dotenv import load_dotenv
from pymongo import MongoClient
load_dotenv()

router = APIRouter()
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]

@router.post("/get-levels")
def create_reading(rqst: LevelRequest):
    progress_collection = db["Progress"]
    result = progress_collection.find_one({"_id": rqst.progress_id})
    if result:
        return result.get("progress_history")
    return {"message": "Progress not found"}

@router.get("/test")
def test():
    return {"message": "Hello World"}
