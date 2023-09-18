from fastapi.testclient import TestClient
from ...test_api import app
from ..util.statistics_models import StatisticsReq

# Create a TestClient using your FastAPI app
client = TestClient(app)

from bson import ObjectId

# Define valid child ID strings
valid_child_id = str("64fc454dc889d0d030785db0")
invalid_child_id = str("14fc454dc889d0d030785db0")


def test_get_stats_child_found():
    # Create a request body with a valid child_id
    rqst_body = {"child_id": valid_child_id}

    # Send a POST request to get statistics
    response = client.post("/statistics/get-stats", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains data (you can customize this check)
    response_data = response.json()
    assert "total_words" in response_data
    assert "average_score" in response_data

def test_get_stats_child_not_found():
    # Create a request body with a valid but non-existent child_id
    rqst_body = {"child_id": invalid_child_id}

    # Send a POST request to get statistics for a non-existent child
    response = client.post("/statistics/get-stats", json=rqst_body)

    # Check if the response status code is 404 (Not Found)
    assert response.status_code == 404

    # Check if the response contains the expected "message" field indicating "Child not found"
    response_data = response.json()
    assert "message" in response_data
    assert response_data["message"] == "Child not found"




