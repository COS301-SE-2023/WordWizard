from fastapi import APIRouter
from ..util.stage_models import LevelRequest
from ...deps import Database
db = Database.getInstance().db

router = APIRouter()

class LevelRequest(BaseModel):
    progress_id: str

def get_score_range(score: int) -> int:
    if 0 <= score < 25:
        return 0
    elif 25 <= score < 50:
        return 1
    elif 50 <= score < 75:
        return 2
    else:
        return 3

@router.post("/get-levels")
def create_reading(rqst: LevelRequest):
    progress_collection = db["Progress"]

    try:
        # Convert the provided string progress_id to ObjectId
        progress_id = ObjectId(rqst.progress_id)
        result = progress_collection.find_one({"_id": progress_id})

        if result:
            score_values : List[int] = []

            for item in result.get("progress_history"):
                score_value = get_score_range(item["score"])
                score_values.append(score_value)

            while len(score_values) < 20:
                score_values.append(0)

            return {"levels": score_values[:20]}
        return {"message": "Progress not found"}

    except Exception as e:
        return {"message": "Invalid ObjectId format"}

@router.get("/test")
def test():
    return {"message": "Hello World"}
