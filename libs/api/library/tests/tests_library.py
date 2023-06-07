import random
import string
from fastapi.testclient import TestClient
from ...api import app
client = TestClient(app)

def generate_random_word(length):
    letters = string.ascii_lowercase
    word = ''.join(random.choice(letters) for _ in range(length))
    return word
word = generate_random_word(6)

def test_get_vocab_valid():
    rqst = {"userID": "64784f19bdfa8f92954b9d78"}
    response = client.post("/library/vocab", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "words" in result
    assert len(result["words"]) > 0
    for word in result["words"]:
        assert "word" in word
        assert "img" in word

def test_get_practice_valid():
    rqst = {"userID": "64784f19bdfa8f92954b9d78"}
    response = client.post("/library/practice", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "words" in result
    assert len(result["words"]) > 0
    for word in result["words"]:
        assert "word" in word
        assert "img" in word

def test_add_practice_valid():
    rqst = {"userID": "64784f19bdfa8f92954b9d78", "word": word}
    response = client.post("/library/practice/add", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "status" in result
    assert result["status"] == "success"

def test_add_vocab_valid():
    rqst = {"userID": "64784f19bdfa8f92954b9d78", "word": word}
    response = client.post("/library/vocab/add", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "status" in result
    assert result["status"] == "success"

def test_add_vocab_duplicate():
    rqst = {"userID": "64784f19bdfa8f92954b9d78", "word": word}
    response = client.post("/library/vocab/add", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "status" in result
    assert result["status"] == "failed"

def test_add_practice_duplicate():
    rqst = {"userID": "64784f19bdfa8f92954b9d78", "word": word}
    response = client.post("/library/practice/add", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "status" in result
    assert result["status"] == "failed"

# def test_get_vocab_no_words_available():
#     rqst = {"userID": "64784f19bdfa8f92954b9d78"}
#     response = client.post("/library/vocab", json=rqst)
#     assert response.status_code == 200
#     result = response.json()
#     assert "words" in result
#     assert len(result["words"]) == 0
#     assert result["status"] == "success"

# def test_get_practice_no_words_available():
#     rqst = {"userID": "64784f19bdfa8f92954b9d78"}
#     response = client.post("/library/practice", json=rqst)
#     assert response.status_code == 200
#     result = response.json()
#     assert "words" in result
#     assert len(result["words"]) == 0
#     assert result["status"] == "success"


# def test_get_vocab_server_error():
#     with patch("app.api.get_vocab_from_database") as mock_get_vocab:
#         mock_get_vocab.side_effect = Exception("Server error")
#         rqst = {"userID": "64784f19bdfa8f92954b9d78"}
#         response = client.post("/library/vocab", json=rqst)
#         assert response.status_code == 500
#         result = response.json()
#         assert "detail" in result
#         assert result["detail"] == "Server error"

