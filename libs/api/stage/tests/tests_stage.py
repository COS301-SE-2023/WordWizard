# Import the necessary modules
from fastapi.testclient import TestClient
from ...test_api import app
from ..util.stage_models import LevelRequest
from bson import ObjectId
import json

# Define the TestClient
client = TestClient(app)

# Define sample data for testing
sample_invalid_progress_id = "invalid_id"  # An invalid ObjectId string

def test_create_reading_success():
    # Create a request body as a dictionary
    rqst_body = {"progress_id": sample_invalid_progress_id}  # Use an invalid ID

    # Send a POST request to create reading levels
    response = client.post("/stage/get-levels", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the "levels" key when progress_id is invalid
    if sample_invalid_progress_id == "invalid_id":
        assert "levels" not in response.json()
    else:
        assert "levels" in response.json()
        
        
def test_create_reading_progress_not_found():
    # Create a request body with an invalid progress_id
    rqst_body = {"progress_id": "611f48439b946a6d5f63227d"}  # Use an invalid progress_id

    # Send a POST request to create reading levels with an invalid progress_id
    response = client.post("/stage/get-levels", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the "message" key indicating progress not found
    assert "message" in response.json() and response.json()["message"] == "Progress not found"
    
    
def test_create_reading_invalid_object_id_format():
    # Create a request body with an invalid ObjectId format
    rqst_body = LevelRequest(progress_id="invalid_object_id_format")

    # Send a POST request to create reading levels with an invalid ObjectId format
    response = client.post("/stage/get-levels", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the "message" key indicating an invalid ObjectId format
    assert "message" in response.json() and response.json()["message"] == "Invalid ObjectId format"    
     
