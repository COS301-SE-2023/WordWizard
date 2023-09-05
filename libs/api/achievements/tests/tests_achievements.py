from fastapi.testclient import TestClient
from ...test_api import app

# Create a TestClient instance for your FastAPI app
client = TestClient(app)

# Define a test function for get_Awards
def test_get_Awards():
    # Create a test request body (you may need to adjust this to match your data structure)
    rqst_body = {
        "child_id": "64c786a89a3bb62b5e333daa"  
    }
    # Send a POST request to the /achievements endpoint
    response = client.post("/achievements/", json=rqst_body)
    assert response.status_code == 200
    response_data = response.json()

    # Check if the response contains any data
    assert response_data, "Response data is empty"
