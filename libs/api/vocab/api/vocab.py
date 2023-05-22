from fastapi import APIRouter
from ..util.vocab_models import Vocab
# ./ = .
# ../ = ..
# ../../ = ...

router = APIRouter()

@router.get("/")
def get_vocab():
    return {"vocab": "vocab"}

@router.post("/{vocab_id}")
def create_vocab(vocab: Vocab, vocab_id: int):
    num = 2000
    return {"vocab_id": num, "vocab": vocab_id}

@router.get("/WordList")
def get_word_list():
    return {"WordList": "WordList"}

@router.post("/WordList/{word_list_id}")
def create_word_list(word_list_id: int):
    num = 2000
    return {"word_list_id": num, "WordList": word_list_id}

@router.get("/Words")
def get_words():
    return {"Words": "Words"}

@router.post("/Words/{words_id}")
def create_words(words_id: int):
    num = 2000
    return {"words_id": num, "Words": words_id}
