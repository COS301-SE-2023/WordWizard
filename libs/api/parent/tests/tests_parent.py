# Import the necessary modules
from fastapi.testclient import TestClient
from ..api.parent import router
from ..util.parent_models import DeleteParentRqst

# Define the TestClient
client = TestClient(router)

# Define sample data for testing
sample_parent_email = "parent@example.com"

def test_delete_parent_success():
    # Create a request body
    rqst_body = DeleteParentRqst(parent_email=sample_parent_email)

    # Send a POST request to delete the parent
    response = client.post("/parent/delete", json=rqst_body)

    # Check if the response status code is 200 (OK)
    assert response.status_code == 200

    # Check if the response contains the expected data
    expected_data = {"status": "success"}
    assert response.json() == expected_data
