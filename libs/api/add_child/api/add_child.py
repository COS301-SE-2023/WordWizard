from fastapi import APIRouter
from ..util.add_child_models import AddChildRqst
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
load_dotenv()

router = APIRouter()

@router.post('/')
def create_reading(rqst: AddChildRqst):
    print(rqst)
    return { 'status': 'success' }