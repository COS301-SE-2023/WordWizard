from fastapi.testclient import TestClient
from .library import router
from ..util.library_models import PracticeRqst, VocabRqst, UpdateRqst

from ...test_api import app


client = TestClient(app)

# Define sample data for testing
sample_user_id = "64c786a89a3bb62b5e333daa"
sample_word = "Test"

# Define test cases for each function

def test_create_reading():
    rqst_body = PracticeRqst(userID=sample_user_id)
    response = client.post('/practice', json=rqst_body)
    assert response.status_code == 200
    assert response.json() is not None

def test_get_vocab():
    rqst_body = VocabRqst(userID=sample_user_id)
    response = client.post('/vocab', json=rqst_body)
    assert response.status_code == 200
    assert response.json() is not None


