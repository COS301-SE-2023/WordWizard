from fastapi.testclient import TestClient
import random
from ...test_api import app
from ..api.add_child import create_progress, create_vocab_list, create_practice_list

client = TestClient(app)

sample_parent_email = "parent@example.com"
sample_parent_name = "Parent Name"
sample_child_name = "Child Name"
sample_child_age = 5
sample_profile_picture = "profile.jpg"


def test_create_practice_list():
    minNumber = 1
    maxNumber = 100000000
    randomNumber = random.randint(minNumber, maxNumber)
    child_id = str(randomNumber)

    result = create_practice_list(child_id=child_id)

    expected_practice_list_document = {
        "_id": child_id,
        "words": []
    }
    assert result == expected_practice_list_document

def test_create_vocab_list():
    minNumber = 1
    maxNumber = 100000000
    randomNumber = random.randint(minNumber, maxNumber)
    child_id = str(randomNumber)

    result = create_vocab_list(child_id=child_id)

    expected_vocab_list_document = {
        "_id": child_id,
        "words": []
    }
    assert result == expected_vocab_list_document

# def test_create_progress():
#     minNumber = 1
#     maxNumber = 100000000
#     randomNumber = random.randint(minNumber, maxNumber)
#     child_id = str(randomNumber)
#     result = create_progress(child_id=child_id)

#     expected_progress_document = {
#         "_id": child_id,
#         "level_scores": {},
#         "total_words": 0,
#         "incorrect_words_by_level": {},
#         "average_score": 0,
#         "highest_score": 0,
#         "progress_history": [],
#         "awards": {
#             "Level Master": {
#                 "Level 1 Conqueror": {
#                     "goal": 1,
#                     "progress": 0,
#                     "description": "Complete level 1",
#                     "completed": False,
#                     "img": "assets/img/Awards/caldron.jpg"
#                 },
#             },
#         }
#     }
#     assert result["_id"] == expected_progress_document["_id"]
#     assert result["total_words"] == expected_progress_document["total_words"]
#     assert result["average_score"] == expected_progress_document["average_score"]

def test_add_create_testing():
    sample_parent_email = "parent@example.com"
    sample_parent_name = "Parent Name"
    sample_child_name = "Child Name"
    sample_child_age = 5
    sample_profile_picture = "profile.jpg"

    rqst_body = {
        "parent_email": sample_parent_email,
        "parent_name": sample_parent_name,
        "name": sample_child_name,
        "age": sample_child_age,
        "profile_picture": sample_profile_picture
    }
    response = client.post('/add-child/', json=rqst_body, params={'testing': True})

    assert response.status_code == 200
    expected_response = {
        '_id': None,
        'username': sample_child_name,
        'age': sample_child_age,
        'preferences': [],
        'parent': None,
        'profile_photo': sample_profile_picture,
        'vocab_list': '',
        'practice_list': '',
        'progress': ''
    }
    assert response.json() == expected_response

def test_get_photos():
    response = client.get('/add-child/')
    assert response.status_code == 200
    assert 'images' in response.json()
    assert len(response.json()['images']) > 0