from fastapi.testclient import TestClient
from ...test_api import app


client = TestClient(app)


def test_get_Awards():
    
    rqst_body = {
        "child_id": "64c786a89a3bb62b5e333daa"  
    }
    # Send a POST request to the /achievements endpoint
    response = client.post("/achievements/", json=rqst_body)
    assert response.status_code == 200
    response_data = response.json()

    # Define the expected structure
    expected_structure = [
        {
            'name': str,
            'awards': [
                {
                    'goal': int,
                    'progress': int,
                    'description': str,
                    'completed': bool,
                    'img': str
                }
            ]
        }
    ]

    # Check if the response data matches the expected structure
    assert isinstance(response_data, list), "Response data is not a list"
    for item in response_data:
        assert all(key in item for key in expected_structure[0]), "Response item structure is incorrect"
        for award in item['awards']:
            assert all(key in award for key in expected_structure[0]['awards'][0]), "Award structure is incorrect"

    for item in response_data:
        assert isinstance(item['name'], str) and item['name'], "Name is invalid"
        for award in item['awards']:
            assert isinstance(award['description'], str) and award['description'], "Award description is invalid"
