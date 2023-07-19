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
    return { 'images': [
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_1.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_11.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_3.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_2.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_4.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_6.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_8.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_7.png",
        "https://ww-img-bucket.s3.amazonaws.com/ww-ProfilePics/dragon_9.png",
        ]}


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
        create_practice_list(result_child.inserted_id)
        create_progress(result_child.inserted_id)
        create_vocab_list(result_child.inserted_id)
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
        create_practice_list(result_child.inserted_id)
        create_progress(result_child.inserted_id)
        create_vocab_list(result_child.inserted_id)
    return { 'status': 'success' }


def create_progress(child_id):
    progress_collection = db["Progress"]
    document = {
        "_id": child_id,
        "level_scores": {},
        "total_words": 0,
        "incorrect_words_by_level": {},
        "average_score": 0,
        "highest_score": 0,
        "progress_history": [],
        "awards": {
            "Level Master": {
                "Level 1 Conqueror": {
                    "goal": 1,
                    "progress": 3,
                    "description": "Complete level 1",
                    "completed": False,
                    "img": ""
                },
                "Level 5 Prodigy": {
                    "goal": 5,
                    "progress": 3,
                    "description": "Complete level 5",
                    "completed": False,
                    "img": ""
                },
                "Level 10 Guru": {
                    "goal": 10,
                    "progress": 3,
                    "description": "Complete level 10",
                    "completed": False,
                    "img": ""
                },
                "WordWizard Legend": {
                    "goal": 20,
                    "progress": 3,
                    "description": "Complete level 20",
                    "completed": False,
                    "img": ""
                }
            },
            "Word Learner": {
                "Word Novice": {
                    "goal": 10,
                    "progress": 6,
                    "description": "Learn 10 new words",
                    "completed": False,
                    "img": ""
                },
                "Word Apprentice": {
                    "goal": 14,
                    "progress": 6,
                    "description": "Learn 14 new words",
                    "completed": False,
                    "img": ""
                },
                "Word Connoisseur": {
                    "goal": 18,
                    "progress": 6,
                    "description": "Learn 18 new words",
                    "completed": False,
                    "img": ""
                },
                "Word Wizard": {
                    "goal": 22,
                    "progress": 6,
                    "description": "Learn 22 new words",
                    "completed": False,
                    "img": ""
                }
            },
            "Practice Enthusiast": {
                "Practice Starter": {
                    "goal": 5,
                    "progress": 5,
                    "description": "Have 5 words in your practice list",
                    "completed": False,
                    "img": ""
                },
                "Practice Explorer": {
                    "goal": 10,
                    "progress": 5,
                    "description": "Have 10 words in your practice list",
                    "completed": False,
                    "img": ""
                },
                "Practice Devotee": {
                    "goal": 15,
                    "progress": 5,
                    "description": "Have 15 words in your practice list",
                    "completed": False,
                    "img": ""
                },
                "Practice Champion": {
                    "goal": 20,
                    "progress": 5,
                    "description": "Have 20 words in your practice list",
                    "completed": False,
                    "img": ""
                }
            },
            "Vocabulary Builder": {
                "Vocabulary Starter": {
                    "goal": 5,
                    "progress": 5,
                    "description": "Build a vocabulary of 5 words",
                    "completed": False,
                    "img": ""
                },
                "Vocabulary Explorer": {
                    "goal": 10,
                    "progress": 5,
                    "description": "Build a vocabulary of 10 words",
                    "completed": False,
                    "img": ""
                },
                "Vocabulary Devotee": {
                    "goal": 15,
                    "progress": 5,
                    "description": "Build a vocabulary of 15 words",
                    "completed": False,
                    "img": ""
                },
                "Vocabulary Champion": {
                    "goal": 20,
                    "progress": 5,
                    "description": "Build a vocabulary of 20 words",
                    "completed": False,
                    "img": ""
                }
            }
        }
    }
    progress_collection.insert_one(document)

def create_vocab_list(child_id):
    vocab_list_collection = db["Vocabulary"]
    document = {
        "_id": child_id,
        "words": []
    }
    vocab_list_collection.insert_one(document)

def create_practice_list(child_id):
    practice_list_collection = db["Practice"]
    document = {
        "_id": child_id,
        "words": []
    }
    practice_list_collection.insert_one(document)