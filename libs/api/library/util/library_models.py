from pydantic import BaseModel
from typing import Optional
    
class PracticeRqst(BaseModel):
    userID: str

class VocabRqst(BaseModel):
    userID: str

class UpdateRqst(BaseModel):
    userID: str
    word: str


# Classes for returning data to client
class Word:
    def __init__(self, word: str, img: str):
        self.word = word
        self.img = img

class WordList:
    def __init__(self):
        self.words = []

    def add_word(self, word: str, img: str):
        new_word = Word(word, img)
        self.words.append(new_word)