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
        "assets/img/ProfilePics/Beautiful_cute_0_8.png",
        "assets/img/ProfilePics/Beautiful_cute_1_10.png",
        "assets/img/ProfilePics/Beautiful_cute_1_9.png",
        "assets/img/ProfilePics/Beautiful_cute_1_6.png",
        "assets/img/ProfilePics/Beautiful_cute_1_1.png",
        "assets/img/ProfilePics/Beautiful_cute_1_2.png",
        "assets/img/ProfilePics/Beautiful_cute_1_4.png",
        "assets/img/ProfilePics/cute_chibi_baby_0_1.png",
        "assets/img/ProfilePics/cute_chibi_blue_1.png",
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
            'preferences': [],
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
        return {
            '_id': str(result_child.inserted_id),
            'username': rqst.name,
            'age': rqst.age,
            'preferences': [],
            'parent': str(existing_parent['_id']),
            'profile_photo': rqst.profile_picture,
            'vocab_list': '',
            'practice_list': '',
            'progress': ''
        }
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
    return {
        '_id': str(result_child.inserted_id),
        'username': rqst.name,
        'age': rqst.age,
        'parent': str(existing_parent['_id']),
        'profile_photo': rqst.profile_picture,
        'vocab_list': '',
        'practice_list': '',
        'progress': ''
    }


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
                    "progress": 0,
                    "description": "Complete level 1",
                    "completed": False,
                    "img": "assets/img/Awards/caldron.jpg"
                },
                "Level 5 Prodigy": {
                    "goal": 5,
                    "progress": 0,
                    "description": "Complete level 5",
                    "completed": False,
                    "img": "assets/img/Awards/crown.jpg"
                },
                "Level 10 Guru": {
                    "goal": 10,
                    "progress": 0,
                    "description": "Complete level 10",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_bracelet1.jpg"
                },
                "WordWizard Legend": {
                    "goal": 20,
                    "progress": 0,
                    "description": "Complete level 20",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_necklace1.jpg"
                }
            },
            "Word Learner": {
                "Word Novice": {
                    "goal": 25,
                    "progress": 0,
                    "description": "Learn 25 new words",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_ring1.jpg"
                },
                "Word Apprentice": {
                    "goal": 50,
                    "progress": 0,
                    "description": "Learn 50 new words",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_ring2.jpg"
                },
                "Word Connoisseur": {
                    "goal": 100,
                    "progress": 0,
                    "description": "Learn 100 new words",
                    "completed": False,
                    "img": "assets/img/Awards/diamond_shoe.jpg"
                },
                "Word Wizard": {
                    "goal": 200,
                    "progress": 0,
                    "description": "Learn 200 new words",
                    "completed": False,
                    "img": "assets/img/Awards/emerald_necklace.jpg"
                }
            },
            "Practice Enthusiast": {
                "Practice Starter": {
                    "goal": 25,
                    "progress": 0,
                    "description": "Have 25 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/emerald_ring.jpg"
                },
                "Practice Explorer": {
                    "goal": 50,
                    "progress": 0,
                    "description": "Have 50 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/glassAward.jpg"
                },
                "Practice Devotee": {
                    "goal": 100,
                    "progress": 0,
                    "description": "Have 100 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/goblet.jpg"
                },
                "Practice Champion": {
                    "goal": 200,
                    "progress": 0,
                    "description": "Have 200 words in your practice list",
                    "completed": False,
                    "img": "assets/img/Awards/necklace.jpg"
                }
            },
            "Vocabulary Builder": {
                "Vocabulary Starter": {
                    "goal": 25,
                    "progress": 0,
                    "description": "Build a vocabulary of 25 words",
                    "completed": False,
                    "img": "assets/img/Awards/potion_bottle.jpg"
                },
                "Vocabulary Explorer": {
                    "goal": 50,
                    "progress": 0,
                    "description": "Build a vocabulary of 50 words",
                    "completed": False,
                    "img": "assets/img/Awards/ruby_ring.jpg"
                },
                "Vocabulary Devotee": {
                    "goal": 100,
                    "progress": 0,
                    "description": "Build a vocabulary of 100 words",
                    "completed": False,
                    "img": "assets/img/Awards/totemAward.jpg"
                },
                "Vocabulary Champion": {
                    "goal": 200,
                    "progress": 0,
                    "description": "Build a vocabulary of 200 words",
                    "completed": False,
                    "img": "assets/img/Awards/wiazard_hat_2.jpg"
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