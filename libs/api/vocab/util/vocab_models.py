from pydantic import BaseModel

class Words(BaseModel):
    words: list[str]
    correctPronunciation: str

class WordList(BaseModel):
    words: list[Words]

class Vocab(WordList):
    name: str
