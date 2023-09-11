from fastapi.testclient import TestClient
from ..util.parent_models import DeleteParentRqst
from ...test_api import app
from bson import ObjectId  
import json

client = TestClient(app)

sample_parent_email = "parent@example.com"

def test_delete_parent_success():
    rqst_body = DeleteParentRqst(parent_email=sample_parent_email)
    rqst_dict = rqst_body.dict()

    response = client.post("/parent/delete", json=rqst_dict)

    assert response.status_code == 200
    expected_data = {"status": "success"}
    assert response.json() == expected_data
