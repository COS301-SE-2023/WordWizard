import random
import string
from fastapi.testclient import TestClient
from ...api import app
# import mongomock

client = TestClient(app)
libClient = TestClient(app)

def generate_random_word(length):
    letters = string.ascii_lowercase
    word = ''.join(random.choice(letters) for _ in range(length))
    return word
word1 = generate_random_word(6)
word2 = generate_random_word(6)

# MOCK API TO TEST DB
def test_get_vocab_valid():
    rqst = {"userID": "64aea4e9116f3e6a544202ba"}
    response = client.post("/library/vocab", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "words" in result
    assert len(result["words"]) > 0
    for word in result["words"]:
        assert "word" in word
        assert "img" in word

def test_get_practice_valid():
    rqst = {"userID": "64aea4e9116f3e6a544202ba"}
    response = client.post("/library/practice", json=rqst)
    assert response.status_code == 200
    result = response.json()
    assert "words" in result
    assert len(result["words"]) > 0
    for word in result["words"]:
        assert "word" in word
        assert "img" in word

# just so we dont continuesly add words to the db
# def test_add_practice_valid():
#     rqst = {"userID": "64784f19bdfa8f92954b9d78", "word": word1}
#     response = client.post("/library/practice/add", json=rqst)
#     assert response.status_code == 200
#     result = response.json()
#     assert "status" in result
#     assert result["status"] == "success"

# def test_add_vocab_valid():
#     rqst = {"userID": "64784f19bdfa8f92954b9d78", "word": word2}
#     response = client.post("/library/vocab/add", json=rqst)
#     assert response.status_code == 200
#     result = response.json()
#     assert "status" in result
#     assert result["status"] == "success"

# def test_get_vocab_no_words_available():
#     rqst = {"userID": "64784f19bdfa8f92954b9d78"}
#     response = client.post("/library/vocab", json=rqst)
#     assert response.status_code == 200
#     result = response.json()
#     assert "words" in result
#     assert len(result["words"]) == 0
#     assert result["status"] == "success"


# def test_insert_parent_doc():
#     # Perform the operation being tested
#     doc = Parent('64784f19bdfa8f92954b9d76','TomBrady','bradyt@gmail.com', [ '64784f19bdfa8f92954b9d77', ''])
#     result = lib.save(doc)
#     # Assert the expected outcome
#     assert result == '64784f19bdfa8f92954b9d76'


# MOCK DB TO TEST API

# def test_get_vocab_api():
#     # Call function to assign the mock client 
#     # assign_mock_client()

#     rqst = {"userID": "64aea4e9116f3e6a544202ba"}
#     response = libClient.post("/library/vocab", json=rqst)
#     assert response.status_code == 200
#     result = response.json()
#     assert "words" in result
#     assert len(result["words"]) > 0
#     for word in result["words"]:
#         assert "word" in word
#         assert "img" in word

    # Reassign the real client
    # assign_actual_client()

