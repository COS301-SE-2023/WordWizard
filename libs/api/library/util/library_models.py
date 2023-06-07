from pydantic import BaseModel
from typing import Optional

# class Word(BaseModel):
#     word: str
#     defenition: str

# class WordList(BaseModel):
#     words: list[Word]
    
class PracticeRqst(BaseModel):
    userID: str

class VocabRqst(BaseModel):
    userID: str

class UpdateVocab(BaseModel):
    userID: str
    word: str

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