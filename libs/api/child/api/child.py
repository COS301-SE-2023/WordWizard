from fastapi import APIRouter
from ..util.child_models import GetChildrenReq, EditChildReq
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
from bson import ObjectId
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
    

@router.post('/edit-child')
def edit(rqst: EditChildReq):
    if (rqst.child_id == ''):
        return { 'status': 'error', 'message': 'No Child id' }
    children_collection = db['Children']
    object_id = ObjectId(rqst.child_id)
    existing_child = children_collection.find_one({'_id': object_id})
    if existing_child:
        children_collection.update_one(
            {'_id': object_id},
            {'$set': {
                'username': rqst.name,
                'age': rqst.age,
                'profile_photo': rqst.profile_picture,
            }}
        )
        return { 'status': 'success' }
    else:
        # Child with the specified child_id not found
        return { 'status': 'error', 'message': 'Child not found' }