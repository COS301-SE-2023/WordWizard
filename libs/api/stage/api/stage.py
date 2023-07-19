from fastapi import APIRouter
from ..util.stage_models import LevelRequest
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId
from pydantic import BaseModel

load_dotenv()

router = APIRouter()
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]

class LevelRequest(BaseModel):
    progress_id: str

@router.post("/get-levels")
def create_reading(rqst: LevelRequest):
    progress_collection = db["Progress"]

    try:
        # Convert the provided string progress_id to ObjectId
        progress_id = ObjectId(rqst.progress_id)
        result = progress_collection.find_one({"_id": progress_id})

        if result:
            return result.get("progress_history")
        return {"message": "Progress not found"}

    except Exception as e:
        return {"message": "Invalid ObjectId format"}

@router.get("/test")
def test():
    return {"message": "Hello World"}
