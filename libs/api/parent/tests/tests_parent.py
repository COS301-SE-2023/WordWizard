# Import the necessary modules
from fastapi.testclient import TestClient
from ..util.parent_models import DeleteParentRqst
from ...test_api import app
from bson import ObjectId  
import json

client = TestClient(app)

# Define sample data for testing
sample_parent_email = "parent@example.com"

def test_delete_parent_success():
    # Create a request body
    rqst_body = DeleteParentRqst(parent_email=sample_parent_email)

    # Convert the request body to a dictionary
    rqst_dict = rqst_body.dict()

    # Send a POST request to delete the parent
    response = client.post("/parent/delete", json=rqst_dict)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the expected data
    expected_data = {"status": "success"}
    assert response.json() == expected_data
