# Import the necessary modules
from fastapi.testclient import TestClient
from bson import ObjectId
from ...test_api import app  # Create a test FastAPI application
from ..util.statistics_models import StatisticsReq

# Set up the TestClient with the test FastAPI application
client = TestClient(app)

# Define sample data for testing
sample_child_id = "611f48439b946a6d5f63227d"  # Replace with a valid child_id
invalid_child_id = str(ObjectId())  # Create a valid, random ObjectId string

def test_get_stats_success_child_found():
    # Create a request body as a dictionary
    rqst_body = {"child_id": sample_child_id}

    # Send a POST request to get statistics using the test FastAPI application
    response = client.post("/statistics/get-stats", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the expected keys (you can customize this)
    expected_keys = ["total_words", "incorrect_words_by_level", "average_score", "highest_score", "progress_history"]
    response_data = response.json()

    for key in expected_keys:
        assert key in response_data

def test_get_stats_child_not_found():
    # Create a request body with a valid but non-existent child_id
    rqst_body = {"child_id": invalid_child_id}

    # Send a POST request to get statistics for a non-existent child using the test FastAPI application
    response = client.post("/statistics/get-stats", json=rqst_body)

    # Check if the response status code is 404 (Not Found)
    assert response.status_code == 404

    # Check if the response contains the expected "detail" field indicating "Child not found"
    response_data = response.json()
    assert "detail" in response_data
    assert response_data["detail"] == "Child not found"

