# Import the necessary modules
from fastapi.testclient import TestClient
from bson import ObjectId
from ...test_api import app
from ..util.statistics_models import StatisticsReq

# Define the TestClient
client = TestClient(app)

# Define sample data for testing
sample_child_id = str("611f48439b946a6d5f63227d")  # Replace with a valid ObjectId string

def test_get_stats_success():
    # Create a request body
    rqst_body = StatisticsReq(child_id=sample_child_id)

    # Mock the database response
    mock_db_response = {
        "total_words": 1000,
        "incorrect_words_by_level": {},
        "average_score": 85,
        "highest_score": 95,
        "progress_history": []
    }

    # Mock the database query to return the mock response
    app.mongodb_client["Progress"].find_one.return_value = mock_db_response

    # Send a POST request to get statistics
    response = client.post("/statistics/get-stats", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the expected data (mocked database response)
    assert response.json() == mock_db_response
