from fastapi.testclient import TestClient
from ...test_api import app
from ..util.statistics_models import StatisticsReq

client = TestClient(app)

from bson import ObjectId

valid_child_id = str("64fc454dc889d0d030785db0")
invalid_child_id = str("14fc454dc889d0d030785db0")


def test_get_stats_child_found():
    rqst_body = {"child_id": valid_child_id}

    response = client.post("/statistics/get-stats", json=rqst_body)

    assert response.status_code == 200

    response_data = response.json()
    assert "total_words" in response_data
    assert "average_score" in response_data


def test_get_stats_child_not_found():
    rqst_body = {"child_id": invalid_child_id}

    response = client.post("/statistics/get-stats", json=rqst_body)

    assert response.status_code == 404

    response_data = response.json()
    assert "detail" in response_data
    assert response_data["detail"] == "Child not found"
