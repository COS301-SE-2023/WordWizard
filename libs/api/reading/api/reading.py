from fastapi import APIRouter
from ..util.reading_models import PassageRqst, Passage, FocusWord


router = APIRouter()

@router.get('/')
def get_reading():
    return {'reading': 'reading'}

@router.post('/passage')
def create_reading(reading: PassageRqst):
    focusWords = [FocusWord(word='test', imageURL='test'), FocusWord(word='test2', imageURL='test2')]
    passage = Passage(passage='test test2', focusWords=focusWords)
    return passage
