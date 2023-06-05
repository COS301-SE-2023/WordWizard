from fastapi import APIRouter

router = APIRouter()

@router.get("/free")
def root():
    return {"message": "Hello World"}
