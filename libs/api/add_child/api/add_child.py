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

@router.get('/')
def get_photos():
    devImage = 'https://img.freepik.com/free-vector/cute-shiba-inu-dog-wearing-dragon-costume-cartoon-vector-icon-illustration-animal-holiday-isolated_138676-7105.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais'
    devImage2 = 'https://img.freepik.com/free-vector/cute-young-dragon-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3544.jpg?size=626&ext=jpg&ga=GA1.2.772846284.1688291417&semt=ais'
    return { 'images': [devImage, devImage2, devImage, devImage2, devImage, devImage2, devImage, devImage2, devImage]}


@router.post('/')
def add_create(rqst: AddChildRqst):
    parent_data = {
        'username': rqst.parent_name,
        'email': rqst.parent_email,
        'children': []
    }
    parents_collection = db['Parents']
    existing_parent = parents_collection.find_one({'email': parent_data['email']})
    if existing_parent:
        children_collection = db['Children']
        result_child = children_collection.insert_one({
            'username': rqst.name,
            'age': rqst.age,
            'parent': existing_parent['_id'],
            'profile_photo': rqst.profile_picture,
            'vocab_list': '',
            'practice_list': '',
            'progress': ''
        })
        parents_collection.update_one(
            {'_id': existing_parent['_id']},
            {'$push': {'children': result_child.inserted_id}}
        )

    else: 
        result_parent = parents_collection.insert_one(parent_data)
        children_collection = db['Children']
        result_child = children_collection.insert_one({
            'username': rqst.name,
            'age': rqst.age,
            'parent': result_parent.inserted_id,
            'profile_photo': rqst.profile_picture,
            'vocab_list': '',
            'practice_list': '',
            'progress': ''
        })
        parents_collection.update_one(
            {'_id': result_parent.inserted_id},
            {'$push': {'children': result_child.inserted_id}}
        )
    return { 'status': 'success' }