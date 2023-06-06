from fastapi import APIRouter
from ..util.vocab_models import Vocab
import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()


router = APIRouter()

@router.get("/")
def get_vocab():
    return {"vocab": "test"}

@router.post("/")
def create_vocab(vocab: Vocab):
    return {"vocab_id": vocab.word}
