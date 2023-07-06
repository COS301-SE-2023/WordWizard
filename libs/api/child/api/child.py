from fastapi import APIRouter
from ..util.child_models import GetChildrenReq
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
load_dotenv()
router = APIRouter()

client = MongoClient(os.getenv("MONGODB_CONNECTION_STRING"))
db = client["WordWizardDB"]

@router.post('/')
def get_children(rqst: GetChildrenReq):
    parent_data = {
        'username': rqst.parent_name,
        'email': rqst.parent_email,
        'children': []
    }
    parents_collection = db['Parents']
    existing_parent = parents_collection.find_one({'email': parent_data['email']})
    if existing_parent:
        children = []
        for id in existing_parent['children']:
            children.append(get_child(id))
        return children
    else:
        result_parent = parents_collection.insert_one(parent_data)
        return []

def get_child(child_id):
    children_collection = db['Children']
    child = children_collection.find_one({'_id': child_id})
    if child:
        child['_id'] = str(child['_id'])
        child['parent'] = str(child['parent'])
        return child
    else:
        return None