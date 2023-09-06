from fastapi.testclient import TestClient
from ..util.add_child_models import AddChildRqst
from ...test_api import app

client = TestClient(app)

# Define sample data for testing
sample_parent_email = "parent@example.com"
sample_parent_name = "Parent"
sample_child_name = "Child"
sample_child_age = 8
sample_profile_picture = "assets/img/ProfilePics/dragon_1.png"

def test_create_practice_list():
    response = client.post('/add-child/create-practice-list')
    assert response.status_code == 200

def test_create_vocab_list():
    response = client.post('/add-child/create-vocab-list')
    assert response.status_code == 200

def test_create_progress():
    response = client.post('/add-child/create-progress')
    assert response.status_code == 200

def test_add_create():
    rqst_body = AddChildRqst(
        parent_email=sample_parent_email,
        parent_name=sample_parent_name,
        name=sample_child_name,
        age=sample_child_age,
        profile_picture=sample_profile_picture
    )
    response = client.post('/add-child', json=rqst_body)
    assert response.status_code == 200
    assert response.json() is not None

def test_get_photos():
    response = client.get('/add-child/')
    assert response.status_code == 200
    assert 'images' in response.json()
    assert len(response.json()['images']) > 0