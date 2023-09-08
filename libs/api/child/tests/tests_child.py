from fastapi.testclient import TestClient
from ...test_api import app
import pytest
from bson import ObjectId  # Import ObjectId


# Create a TestClient instance
client = TestClient(app)

# Define sample data for testing
sample_parent_email = "parent@example.com"
sample_parent_name = "Parent Name"
sample_child_id = "64f9c5cbeb1d649f98debec2"  # Replace with a valid child_id
sample_preferences = ["Preference1", "Preference2"]
sample_child_name = "Child Name"
sample_child_age = 5
sample_profile_picture = "profile.jpg"


def test_get_topics():
    response = client.get("/child/")
    assert response.status_code == 200
    assert "topics" in response.json()
    assert len(response.json()["topics"]) > 0


def test_get_children():
    # Create a request body
    rqst_body = {
        "parent_email": sample_parent_email,
        "parent_name": sample_parent_name,
    }

    # Send a POST request to get children
    response = client.post("/child/", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains a list of children
    assert isinstance(response.json(), list)
    
    
def test_get_preferences():
    # Create a request body
    rqst_body = {"child_id": sample_child_id}

    # Send a POST request to get preferences
    response = client.post("/child/get-preferences", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains preferences
    assert "preferences" in response.json() 

