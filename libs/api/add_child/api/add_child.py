from fastapi import APIRouter
from ..util.add_child_models import AddChildRqst
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
load_dotenv()
from bson import ObjectId
from typing import Optional

router = APIRouter()

connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]

@router.get('/')
def get_photos():
    return { 'images': [
        "assets/img/ProfilePics/ProfilePicture_BlueOwl.png",
        "assets/img/ProfilePics/ProfilePicture_Pheonix.png",
        "assets/img/ProfilePics/ProfilePicture_GreenUnicorn.png",
        "assets/img/ProfilePics/ProfilePicture_WhiteCat.png",
        "assets/img/ProfilePics/ProfilePicture_PurpleOwl.png",
        "assets/img/ProfilePics/ProfilePicture_RedDragon.png",
        "assets/img/ProfilePics/ProfilePicture_BlueDragon.png",
        "assets/img/ProfilePics/ProfilePicture_PinkUnicorn.png",
        "assets/img/ProfilePics/ProfilePicture_BlackCat.png",
    ]}

@router.post('/')
def add_create(rqst: AddChildRqst, testing: Optional[bool] = False):
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
            'preferences': [],
            'parent': existing_parent['_id'] if not testing else None,
            'profile_photo': rqst.profile_picture
        })
        if not testing:
            parents_collection.update_one(
                {'_id': existing_parent['_id']},
                {'$push': {'children': result_child.inserted_id}}
            )
            create_practice_list(result_child.inserted_id)
            create_progress(result_child.inserted_id)
            create_vocab_list(result_child.inserted_id)
        return {
            '_id': str(result_child.inserted_id) if not testing else None,
            'username': rqst.name,
            'age': rqst.age,
            'preferences': [],
            'parent': str(existing_parent['_id']) if not testing else None,
            'profile_photo': rqst.profile_picture
        }
    else:
        result_parent = parents_collection.insert_one(parent_data)
        children_collection = db['Children']
        result_child = children_collection.insert_one({
            'username': rqst.name,
            'age': rqst.age,
            'parent': result_parent.inserted_id if not testing else None,
            'profile_photo': rqst.profile_picture
        })
        if not testing:
            parents_collection.update_one(
                {'_id': result_parent.inserted_id},
                {'$push': {'children': result_child.inserted_id}}
            )
            create_practice_list(result_child.inserted_id)
            create_progress(result_child.inserted_id)
            create_vocab_list(result_child.inserted_id)
        return {
            '_id': str(result_child.inserted_id) if not testing else None,
            'username': rqst.name,
            'age': rqst.age,
            'parent': str(result_parent.inserted_id) if not testing else None,
            'profile_photo': rqst.profile_picture
        }

def create_progress(db = None, child_id = ""):
    
    if db is None:
        db = client["WordWizardDB"]
    
    progress_collection = db["Progress"]
    document = {
        "_id": child_id,
        "total_words": 0,
        "incorrect_words_by_level": {},
        "average_score": 0,
        "highest_score": 0,
        "progress_history": [],
        "awards": {
            "Level Master": {
                "Level 1 Conqueror": {
                    "goal": 1,
                    "description": "Complete level 1",
                    "completed": False,
                    "img": "assets/img/Awards/caldron.jpg"
                },
                "Level 5 Prodigy": {
                    "goal": 5,
                    "description": "Complete level 5",
                    "completed": False,
                    "img": "assets/img/Awards/crown.jpg"
                },
                "Level 10 Guru": {
                    "goal": 10,
                    "description": "Complete level 10",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_bracelet1.jpg"
                },
                "WordWizard Legend": {
                    "goal": 20,
                    "description": "Complete level 20",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_necklace1.jpg"
                }
            },
            "Word Learner": {
                "Word Novice": {
                    "goal": 25,
                    "description": "Learn 25 new words",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_ring1.jpg"
                },
                "Word Apprentice": {
                    "goal": 50,
                    "description": "Learn 50 new words",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_ring2.jpg"
                },
                "Word Connoisseur": {
                    "goal": 100,
                    "description": "Learn 100 new words",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_shoe.jpg"
                },
                "Word Wizard": {
                    "goal": 200,
                    "description": "Learn 200 new words",
                    "completed": False,
                    "img": "assets/img/Awards/emerald_necklace.jpg"
                }
            },
            "Practice Enthusiast": {
                "Practice Starter": {
                    "goal": 25,
                    "description": "Have 25 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/emerald_ring.jpg"
                },
                "Practice Explorer": {
                    "goal": 50,
                    "description": "Have 50 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/glassAward.jpg"
                },
                "Practice Devotee": {
                    "goal": 100,
                    "description": "Have 100 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/goblet.jpg"
                },
                "Practice Champion": {
                    "goal": 200,
                    "description": "Have 200 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/necklace.jpg"
                }
            },
            "Vocabulary Builder": {
                "Vocabulary Starter": {
                    "goal": 25,
                    "description": "Build a vocabulary of 25 words",
                    "completed": False,
                    "img": "assets/img/Awards/potion_bottle.jpg"
                },
                "Vocabulary Explorer": {
                    "goal": 50,
                    "description": "Build a vocabulary of 50 words",
                    "completed": False,
                    "img": "assets/img/Awards/ruby_ring.jpg"
                },
                "Vocabulary Devotee": {
                    "goal": 100,
                    "description": "Build a vocabulary of 100 words",
                    "completed": False,
                    "img": "assets/img/Awards/totemAward.jpg"
                },
                "Vocabulary Champion": {
                    "goal": 200,
                    "description": "Build a vocabulary of 200 words",
                    "completed": False,
                    "img": "assets/img/Awards/wiazard_hat_2.jpg"
                }
            }
        }
    }
    result = progress_collection.insert_one(document)
    return progress_collection.find_one({"_id": child_id})

def create_vocab_list(child_id, db=None):
    if db is None:
        db = client["WordWizardDB"]
    
    vocab_list_collection = db["Vocabulary"]
    document = {
        "_id": child_id,
        "words": []
    }
    result = vocab_list_collection.insert_one(document)
    return vocab_list_collection.find_one({"_id": child_id})

def create_practice_list(child_id, db=None):
    if db is None:
        db = client["WordWizardDB"]
    
    practice_list_collection = db["Practice"]
    document = {
        "_id": child_id,
        "words": []
    }
    result = practice_list_collection.insert_one(document)
    return practice_list_collection.find_one({"_id": child_id})  