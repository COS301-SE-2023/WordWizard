from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList


router = APIRouter()

@router.get('/')
def get_practice():
    return {'reading': 'reading'}

@router.post('/practice')
def create_reading(reading: PracticeRqst):
    wordList = WordList(words=[
        Word(word='practice', defenition='defenition'), 
        Word(word='word', defenition='defenition')
    ])
    return wordList

@router.post('/vocab')
def create_vocab(vocab: VocabRqst):
    wordList = WordList(words=[
        Word(word='vocab', defenition='defenition'), 
        Word(word='word', defenition='defenition')
    ])
    return wordList