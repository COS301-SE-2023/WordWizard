from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PassageRqst(BaseModel):
    id: str
    level: int


class Word(BaseModel):
    word: str
    imageURL: Optional[str] = None
    correct: Optional[bool] = None


class Content(BaseModel):
    passage: list[Word]
    focusWordsIndex: list[int]


class Progress(BaseModel):
    level: int
    content: list[Word]
    score: int
    date: str
    incorrect_words: int


class UpdateProgressRqst(BaseModel):
    child_id: str
    progress: Progress
