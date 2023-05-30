from fastapi import APIRouter
from ..util.library_models import PracticeRqst


router = APIRouter()

@router.get('/')
def get_practice():
    return {'reading': 'reading'}

@router.post('/passage')
def create_reading(reading: PracticeRqst):
    return {'reading': reading}
