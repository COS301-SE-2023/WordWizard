from fastapi import APIRouter
from ..util.reading_models import reading


router = APIRouter()

@router.get('/')
def get_reading():
    return {'reading': 'reading'}

@router.post('/')
def create_reading(reading: reading):
    return {'reading': 'reading created'}