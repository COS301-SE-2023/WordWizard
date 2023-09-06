# Import the necessary modules
from fastapi.testclient import TestClient
from bson import ObjectId
from ...test_api import app
from ..api.add_child import create_progress, create_vocab_list, create_practice_list
import random



# Define the TestClient
client = TestClient(app)

# Define sample data for testing
sample_parent_email = "parent@example.com"
sample_parent_name = "Parent Name"
sample_child_name = "Child Name"
sample_child_age = 5
sample_profile_picture = "profile.jpg"


def test_create_practice_list():

    minNumber = 1
    maxNumber = 100000000
    randomNumber = random.randint(minNumber, maxNumber)
    # Generate a sample child_id (you can customize this based on your needs)
    child_id = str(randomNumber)  # Convert ObjectId to string

    # Call the function to create a practice list
    result = create_practice_list(child_id=child_id)

    # Define the expected practice list document
    expected_practice_list_document = {
        "_id": child_id,
        "words": []
    }

    # Assert that the result matches the expected practice list document
    assert result == expected_practice_list_document

def test_create_vocab_list():

    minNumber = 1
    maxNumber = 100000000
    randomNumber = random.randint(minNumber, maxNumber)
    # Generate a sample child_id (you can customize this based on your needs)
    child_id = str(randomNumber)  # Convert ObjectId to string

    # Call the function to create a vocabulary list
    result = create_vocab_list(child_id=child_id)

    # Define the expected vocabulary list document
    expected_vocab_list_document = {
        "_id": child_id,
        "words": []
    }

    # Assert that the result matches the expected vocabulary list document
    assert result == expected_vocab_list_document

def test_create_progress():
    # Generate a sample child_id (you can customize this based on your needs)
    minNumber = 1
    maxNumber = 100000000
    randomNumber = random.randint(minNumber, maxNumber)
    # Generate a sample child_id (you can customize this based on your needs)
    child_id = str(randomNumber)  # Convert ObjectId to string
    # Call the function to create progress
    result = create_progress(child_id=child_id)

    # Define the expected progress document
    expected_progress_document = {
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
                # Add other award levels as needed
            },
            # Add other award categories as needed
        }
    }

    # Assert against specific keys and values
    assert result["_id"] == expected_progress_document["_id"]
    assert result["total_words"] == expected_progress_document["total_words"]
    assert result["average_score"] == expected_progress_document["average_score"]
    # Continue asserting against other keys and values as needed



def test_add_create():
    rqst_body = {
        "parent_email": sample_parent_email,
        "parent_name": sample_parent_name,
        "name": sample_child_name,
        "age": sample_child_age,
        "profile_picture": sample_profile_picture
    }

    response = client.post('/add-child/', json=rqst_body)
    assert response.status_code == 200
    assert response.json() is not None
    assert 'username' in response.json()

def test_get_photos():
    response = client.get('/add-child/')
    assert response.status_code == 200
    assert 'images' in response.json()
    assert len(response.json()['images']) > 0