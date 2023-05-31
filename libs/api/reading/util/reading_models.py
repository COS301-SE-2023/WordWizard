from pydantic import BaseModel
from typing import Optional

class PassageRqst(BaseModel):
    userID: str
    readingLevel: str

class Word(BaseModel):
    word: str
    imageURL: Optional[str] = None
    correct: Optional[bool] = None

class Content(BaseModel):
    passage: list[Word]
    focusWordsIndex: list[int]
