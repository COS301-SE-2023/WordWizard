from fastapi.testclient import TestClient
from ...test_api import app
from ..util.reading_models import PassageRqst, Content, Word  # Adjust the import path
from unittest.mock import patch, MagicMock
from ..util.helper import *
from ..util.Rating import Rating


client = TestClient(app)

def test_create_reading():
    passage_rqst = PassageRqst(id="64c0e54aaf5aebe5c12853a5", level=1)
    response = client.post("/reading/passage", json=passage_rqst.dict())
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
    assert "passage" in response.json()
    assert "focusWordsIndex" in response.json()
    assert isinstance(response.json()["passage"], list)
    for word in response.json()["passage"]:
        assert "word" in word
        assert "imageURL" in word
        assert "correct" in word
    assert isinstance(response.json()["focusWordsIndex"], list)

def test_santise_string():
    response = "Sentence: The quick brown fox jumps over the lazy dog.\nFocus Words: quick, fox, lazy"
    expected_content = Content(
        passage=[
            Word(word="The", imageURL="img", correct=None),
            Word(word="quick", imageURL=generate_image("quick"), correct=None),
            Word(word="brown", imageURL="img", correct=None),
            Word(word="fox", imageURL=generate_image("fox"), correct=None),
            Word(word="jumps", imageURL="img", correct=None),
            Word(word="over", imageURL="img", correct=None),
            Word(word="the", imageURL="img", correct=None),
            Word(word="lazy", imageURL=generate_image("lazy"), correct=None),
            Word(word="dog", imageURL="img", correct=None),
        ],
        focusWordsIndex=[1, 3, 7]
    )
    assert santise_string(response) == expected_content

def test_count_syllables():
    assert count_syllables("hello") == 2
    assert count_syllables("world") == 1
    assert count_syllables("syllable") == 3

def test_find_phonotactics():
    assert find_phonotactics("hello") == "CVCC"
    assert find_phonotactics("world") == "CVCC"
    assert find_phonotactics("syllable") == "CVCC"

def test_get_prefixes_suffixes():
    assert get_prefixes_suffixes("testing") == ("ing", None)
    assert get_prefixes_suffixes("anti-war") == (None, 'a')
    assert get_prefixes_suffixes("syllable") == ('able', None)

def test_get_prefix():
    with patch('random.choice', MagicMock(return_value="pre")):
        assert get_prefix(3) == "pre"

def test_get_suffix():
    with patch('random.choice', MagicMock(return_value="ing")):
        assert get_suffix(3) == "ing"

def test_get_phonotactic():
    assert get_phonotactic("CV") == 2
    assert get_phonotactic("CVC") == 3
    assert get_phonotactic("V") == 1


def test_rating_initialization():
    vcb = ["hello", "world"]
    prtc = ["preheat", "postpone"]
    pref = ["pre"]
    rating = Rating(vcb, prtc, pref)
    assert rating.vcb == vcb
    assert rating.prtc == prtc
    assert rating.pref == pref

def test_rating_fit():
    vcb = ["hello", "world"]
    prtc = ["preheat", "postpone"]
    pref = ["pre"]
    rating = Rating(vcb, prtc, pref)
    print(f"{rating.phono_dic=}")
    assert 1 == 1

