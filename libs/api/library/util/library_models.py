from pydantic import BaseModel
from typing import Optional

class Word(BaseModel):
    word: str
    defenition: str

class WordList(BaseModel):
    words: list[Word]
    
class PracticeRqst(BaseModel):
    userID: str

class VocabRqst(BaseModel):
    userID: str


#     from pydantic import BaseModel
# from typing import Optional

# class Word(BaseModel):
#     word: str
#     defenition: str

# class WordList(BaseModel):
#     words: list[Word]
    
# class PracticeRqst(BaseModel):
#     userID: str

# class VocabRqst(BaseModel):
#     userID: str
