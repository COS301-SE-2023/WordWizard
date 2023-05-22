import pytest
import requests
from fastapi.testclient import TestClient

from ...api import app

client = TestClient(app)

def test_get_vocab():
    response = client.get("/vocab")
    assert response.status_code == 200
    valid = False
    #expect response to be a list of strings
    if isinstance(response.json(), list):
        if isinstance(response.json()[0], str):
            valid = True
    assert valid == True
    assert response.json() == {"vocab": "vocab"}

def test_post_vocab():
    assert 1 == 1

def test_get_word_list():
    response = client.get("/vocab/WordList")
    assert response.status_code == 200
    valid = False
    #expect response to be a list of strings
    if isinstance(response.json(), list):
        if isinstance(response.json()[0], str):
            valid = True
    assert valid == True
    assert response.json() == {"WordList": "WordList"}

def test_post_word_list():
    assert 1 == 1

def test_get_words():
    response = client.get("/vocab/Words")
    assert response.status_code == 200
    valid = False
    #expect response to be a list of strings
    if isinstance(response.json(), list):
        if isinstance(response.json()[0], str):
            valid = True
    assert valid == True
    assert response.json() == {"Words": "Words"}

def test_post_words():
    assert 1 == 1
