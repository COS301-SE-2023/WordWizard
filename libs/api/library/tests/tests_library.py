from fastapi.testclient import TestClient
from ..util.library_models import PracticeRqst, VocabRqst, UpdateRqst
from ...test_api import app

client = TestClient(app)

# Define sample data for testing
sample_user_id = "64c786a89a3bb62b5e333daa"
sample_word = "Test"

# Define test cases for each function

def test_create_reading():
    rqst_body = {"userID": sample_user_id}
    response = client.post('/library/practice', json=rqst_body)
    print("Response:", response.json())  # Log the response
    assert response.status_code == 200
    assert response.json() is not None

def test_get_vocab():
    rqst_body = {"userID": sample_user_id}
    response = client.post('/library/vocab', json=rqst_body)
    print("Response:", response.json())  # Log the response
    assert response.status_code == 200
    assert response.json() is not None

def test_remove_practice():
    rqst_body = {"userID": sample_user_id, "word": sample_word}
    response = client.post('/library/practice/remove', json=rqst_body)
    print("Response:", response.json())  # Log the response
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_add_practice():
    rqst_body = {"userID": sample_user_id, "word": sample_word}
    response = client.post('/library/practice/add', json=rqst_body)
    print("Response:", response.json())  # Log the response
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_add_vocab():
    rqst_body = {"userID": sample_user_id, "word": sample_word}
    response = client.post('/library/vocab/add', json=rqst_body)
    print("Response:", response.json())  # Log the response
    assert response.status_code == 200
    assert response.json()["status"] == "success"
