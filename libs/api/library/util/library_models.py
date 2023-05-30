from pydantic import BaseModel
from typing import Optional

class PracticeRqst(BaseModel):
    userID: str

class VocabRqst(BaseModel):
    userID: str
