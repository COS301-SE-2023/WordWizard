from fastapi import APIRouter
from ..util.add_child_models import AddChildRqst
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
load_dotenv()


router = APIRouter()

connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]

@router.post('/')
def create_reading(rqst: AddChildRqst):
    print(rqst)

# # Connect to MongoDB

# # Define the parent user data
    parent_data = {
        'username': rqst.parent_name,
        'email': rqst.parent_email,
        'children': []
    }

    # Define the child user data
    child_data = {
        'username': rqst.name,
        'age': rqst.age,
        'vocab_list': '',
        'practice_list': '',
        'progress': ''
    }

#     # Get the Parents collection
    parents_collection = db['Parent']

#     # Check if the parent user already exists based on the email
    existing_parent = parents_collection.find_one({'email': parent_data['email']})

    if existing_parent:
        parent_id = existing_parent['_id']
        child_data['parent'] = parent_id

        children_collection = db['Children']
        children_collection.insert_one(child_data)

        parents_collection.update_one(
            {'_id': parent_id},
            {'$push': {'children': child_data['_id']}}
        )
    else:
        children = [child_data['_id']]
        parent_data['children'] = children

        parents_collection.insert_one(parent_data)

        child_data['parent'] = parent_data['_id']
        children_collection = db['Children']
        children_collection.insert_one(child_data)

    return { 'status': 'success' }