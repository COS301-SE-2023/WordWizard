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

@router.post('/')
def add_pin(rqst: SetPinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'_id': ObjectId(rqst.parent_id)})
    if parent:
        parent_collection.update_one(
            {'_id': ObjectId(rqst.parent_id)},
            {'$set': {'validate_password': rqst.validate_password, 'pin': rqst.new_pin}}
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
    
def change_pin(rqst: SetPinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'_id': ObjectId(rqst.parent_id)})
    if parent:
        parent_collection.update_one(
            {'_id': ObjectId(rqst.parent_id)},
            {'$set': {'pin': rqst.new_pin}}
        )
        return {
            'message': 'Pin successfully changed',
            'status_code': True
        }
    else:
        return {
            'message': 'Parent not found',
            'status_code': False
        }
    
def validate_word(rqst: ValidatePasswordReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'_id': ObjectId(rqst.parent_id)})
    if parent:
        if parent['validate_password'] == rqst.validate_password:
            return True
        else:
            return False
    else:
        return False
    
def validate_pin (rqst: PinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'_id': ObjectId(rqst.parent_id)})
    if parent:
        return parent['pin']
    else:
        return False

def get_pin (rqst: PinReq):
    parent_collection = db['Parents']
    parent = parent_collection.find_one({'_id': ObjectId(rqst.parent_id)})
    if parent:
        return parent['pin']
    else:
        return False