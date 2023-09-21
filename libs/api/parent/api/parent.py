from fastapi import APIRouter
from ..util.parent_models import DeleteParentRqst
from ...deps import Database
db = Database.getInstance().db
router = APIRouter()

@router.post("/delete")
def delete_parent(rqst: DeleteParentRqst):
    try:
        result = db["Parents"].find_one({"email": rqst.parent_email})
        for child in result["children"]:
            db["Practice"].delete_one({"_id": child})
            db["Vocabulary"].delete_one({"_id": child})
            db["Progress"].delete_one({"_id": child})
            db["Children"].delete_one({"_id": child})
        db["Parents"].delete_one({"email": rqst.parent_email})
        db["user"].delete_one({"username": rqst.parent_email})
    except Exception as e:
        return { "status" : "error" }
    return { "status" : "success" }