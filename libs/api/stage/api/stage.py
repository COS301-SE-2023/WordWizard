from typing import List
from fastapi import APIRouter
from ..util.stage_models import LevelRequest
from ...deps import Database

db = Database.getInstance().db
from bson import ObjectId


router = APIRouter()


def get_score_range(score: int) -> int:
    if score == 100:
        return 3
    elif score >= 75:
        return 2
    elif score >= 50:
        return 1
    else:
        return 0


@router.post("/get-levels")
def create_reading(rqst: LevelRequest):
    progress_collection = db["Progress"]

    try:
        result = progress_collection.find_one({"_id": ObjectId(rqst.progress_id)})

        if result:
            score_values: List[int] = []

            for level in result.get("level_scores"):
                score_value = get_score_range(result["level_scores"][str(level)])
                score_values.append(score_value)

            while len(score_values) < 50:
                score_values.append(0)

            return {"levels": score_values[:50]}
        return {"message": "Progress not found"}

    except Exception as e:
        return {"message": "Invalid ObjectId format"}
