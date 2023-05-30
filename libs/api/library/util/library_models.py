from pydantic import BaseModel
from typing import Optional

class Word(BaseModel):
    word: str
    defenition: str
class PracticeRqst(BaseModel):
    userID: str

class VocabRqst(BaseModel):
    userID: str
