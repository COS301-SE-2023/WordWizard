from fastapi.testclient import TestClient
from ...test_api import app
from ..util.stage_models import LevelRequest
from bson import ObjectId
import json
from ..api.stage import get_score_range


client = TestClient(app)

sample_invalid_progress_id = "invalid_id"  

def test_create_reading_success():
    rqst_body = {"progress_id": sample_invalid_progress_id}

    response = client.post("/stage/get-levels", json=rqst_body)

    assert response.status_code == 200

    if sample_invalid_progress_id == "invalid_id":
        assert "levels" not in response.json()
    else:
        assert "levels" in response.json()
        
        
def test_create_reading_progress_not_found():
    rqst_body = {"progress_id": "611f48439b946a6d5f63227d"}

    response = client.post("/stage/get-levels", json=rqst_body)
    assert response.status_code == 200
    assert "message" in response.json() and response.json()["message"] == "Progress not found"
    
    
def test_create_reading_invalid_object_id_format():
    rqst_body = LevelRequest(progress_id="invalid_object_id_format")

    response = client.post("/stage/get-levels", json=rqst_body.dict())

    assert response.status_code == 200
    assert "message" in response.json() and response.json()["message"] == "Invalid ObjectId format"

    
def test_get_score_range():
    test_cases = [
        (30, 0),  
        (50, 1),  
        (75, 2),  
        (90, 2), 
        (25, 0),  
        (0, 0), 
        (100, 3), 
    ]

    for score, expected_range in test_cases:
        result = get_score_range(score)
        assert result == expected_range


        
     
