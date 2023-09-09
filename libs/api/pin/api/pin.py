from fastapi import APIRouter
import os
from dotenv import load_dotenv
from ..util.pin_models import SetPinReq, ValidatePasswordReq, SetPinRsp, PinReq, PinRsp
from pymongo import MongoClient
from bson import ObjectId
load_dotenv()


router = APIRouter()

connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]

@router.post('/add-pin')
def add_pin(rqst: SetPinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'email': rqst.parent_email})
    if parent:
        parent_collection.update_one(
            {'email': rqst.parent_email},
            {'$set': {'validation_word': rqst.validation_word, 'pin': rqst.new_pin}}
        )
        return {
            'message': 'Pin successfully made',
            'status_code': True
        }
    else:
        return {
            'message': 'Parent not found',
            'status_code': False
        }

@router.post('/change-pin')
def change_pin(rqst: SetPinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'email': rqst.parent_email})
    if parent:
        if parent['validation_word'] == rqst.validation_word:
            parent_collection.update_one(
                {'email': rqst.parent_email},
                {'$set': {'pin': rqst.new_pin}}
            )
            return {
                'message': 'Pin successfully changed',
                'status_code': True
            }
        else:
            return {
                'message': 'Incorrect validation word',
                'status_code': False
            }
    else:
        return {
            'message': 'Parent not found',
            'status_code': False
        }


@router.post('/validate-word')
def validate_word(rqst: ValidatePasswordReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'email': rqst.parent_email})
    if parent:
        if parent['validation_word'] == rqst.validation_word:
            return True
        else:
            return False
    else:
        return False

@router.post('/validate-pin')
def validate_pin (rqst: PinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'email': rqst.parent_email})
    if parent:
        return parent['pin']
    else:
        return False

@router.post('/get-pin')
def get_pin (rqst: PinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'email': rqst.parent_email})
    if parent:
        return parent['pin']
    else:
        return False