from fastapi import APIRouter
from ..util.vocab_models import Vocab


router = APIRouter()

@router.get("/")
def get_vocab():
    return {"vocab": "vocab"}

@router.post("/{vocab_id}")
def create_vocab(vocab: Vocab):
    return {"vocab_id": vocab.word}