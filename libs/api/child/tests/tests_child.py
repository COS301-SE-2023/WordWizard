from fastapi.testclient import TestClient
from ...test_api import app
from bson import ObjectId
from ..api.child import delete

client = TestClient(app)

sample_parent_email = "parent@example.com"
sample_parent_name = "Parent Name"
sample_child_id = "65087dc330bd3697ca68e1a6"
sample_preferences = ["Preference1", "Preference2"]
sample_child_name = "Child Name"
sample_child_age = 5
sample_profile_picture = "profile.jpg"


def test_get_topics():
    response = client.get("/child/")
    assert response.status_code == 200
    assert "topics" in response.json()
    assert len(response.json()["topics"]) > 0


def test_get_children():
    rqst_body = {
        "parent_email": sample_parent_email,
        "parent_name": sample_parent_name,
    }

    response = client.post("/child/", json=rqst_body)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_preferences():
    rqst_body = {"child_id": sample_child_id}

    response = client.post("/child/get-preferences", json=rqst_body)
    assert response.status_code == 200
    assert "preferences" in response.json()


def test_update_preferences():
    rqst_body = {"child_id": sample_child_id, "preferences": sample_preferences}

    response = client.post("/child/update-preferences", json=rqst_body)
    assert response.status_code == 200
    assert "status" in response.json() and response.json()["status"] == "success"


def test_edit_child():
    rqst_body = {
        "child_id": sample_child_id,
        "name": sample_child_name,
        "age": sample_child_age,
        "profile_picture": sample_profile_picture,
    }

    response = client.post("/child/edit-child", json=rqst_body)
    assert response.status_code == 200
    assert "status" in response.json() and response.json()["status"] == "success"


def test_delete_child():
    sample_child_id = "65087dc330bd3697ca68e1a6"
    mock_delete_child_from_db_result = {"status": "success"}
    app.dependency_overrides[delete] = lambda: mock_delete_child_from_db_result

    response = client.post("/child/delete-child", json={"child_id": sample_child_id})

    assert response.status_code == 200
    assert response.json() == mock_delete_child_from_db_result


def mock_delete_child_from_db(child_id):
    return {"status": "success"}
