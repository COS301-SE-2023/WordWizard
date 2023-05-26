from pydantic import BaseModel

class FocusWord(BaseModel):
    word: str
    imageURL: str

class Passage(BaseModel):
    passage: str
    focusWords: list[FocusWord]

class PassageRqst(BaseModel):
    userID: str
    readingLevel: str
