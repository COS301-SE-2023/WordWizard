from fastapi.testclient import TestClient
from ...test_api import app

client = TestClient(app)

sample_user_id = "64feea8cc606de65ef2628c9"
sample_word = "Test"

def test_create_reading():
    rqst_body = {"userID": sample_user_id}
    response = client.post('/library/practice', json=rqst_body) 
    assert response.status_code == 200
    assert response.json() is not None

def test_get_vocab():
    rqst_body = {"userID": sample_user_id}
    response = client.post('/library/vocab', json=rqst_body)
    assert response.status_code == 200
    assert response.json() is not None

def test_remove_practice():
    rqst_body = {"userID": sample_user_id, "word": sample_word}
    response = client.post('/library/practice/remove', json=rqst_body)
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_add_practice():
    rqst_body = {"userID": sample_user_id, "word": sample_word}
    response = client.post('/library/practice/add', json=rqst_body)
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_add_vocab():
    rqst_body = {"userID": sample_user_id, "word": sample_word}
    response = client.post('/library/vocab/add', json=rqst_body)
    assert response.status_code == 200
    assert response.json()["status"] == "success"
