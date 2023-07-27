from fastapi import APIRouter
from ..util.parent_models import DeleteParentRqst
from ...deps import Database
db = Database.getInstance().db

router = APIRouter()

@router.post("/delete")
def delete_parent(rqst: DeleteParentRqst):
    try:    
        collection = db["Parents"]
        result = collection.find_one({"email": rqst.parent_email})
        for child in result["children"]:
            delete_practice(child)
            delete_vocab(child)
            delete_progress(child)
            delete_children(child)
        collection.delete_one({"email": rqst.parent_email})
    except Exception as e:
        return {"status": "error"}
    return {"status": "success"}

def delete_practice(child_id):
    collection = db["Practice"]
    result = collection.delete_one({"_id": child_id})

def delete_vocab(child_id):
    collection = db["Vocabulary"]
    result = collection.delete_one({"_id": child_id})
def delete_progress(child_id):
    collection = db["Progress"]
    result = collection.delete_one({"_id": child_id})

def delete_children(parent_id):
    collection = db["Children"]
    result = collection.delete_one({"_id": parent_id})