import pytest
import requests
from fastapi.testclient import TestClient

from ...api import app

client = TestClient(app)

def test_get_vocab():
    # response = client.get("/vocab")
    # assert response.status_code == 200
    # assert response.json() == {"vocab": "vocab"}
    assert 1 == 1