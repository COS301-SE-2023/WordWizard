# Import the necessary modules
from fastapi.testclient import TestClient
from ...test_api import app
from ..util.stage_models import LevelRequest
from bson import ObjectId  
import json

# Define the TestClient
client = TestClient(app)

# Define sample data for testing
sample_progress_id = "611f48439b946a6d5f63227d"  # Replace with a valid ObjectId string

def test_create_reading_success():
    # Create a request body
    rqst_body = LevelRequest(progress_id=sample_progress_id)

    # Send a POST request to create reading levels
    response = client.post("/stage/get-levels", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the "levels" key
    assert "levels" in response.json()