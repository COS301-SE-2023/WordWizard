from fastapi import APIRouter
from ..util.vocab_models import Vocab


router = APIRouter()

@router.get("/")
def get_vocab():
    return {"vocab": "test"}

@router.post("/")
def create_vocab(vocab: Vocab):
    return {"vocab_id": vocab.word}
