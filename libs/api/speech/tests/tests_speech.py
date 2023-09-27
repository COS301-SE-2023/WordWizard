import os
import tempfile
from fastapi.testclient import TestClient
from ..util.speech_models import AudioRqst
from ...test_api import app

client = TestClient(app)


def test_text_to_speech():
    rqst = AudioRqst(text="Hello, world!")
    response = client.post("/speech/text-to-speech", json=rqst.dict())
    assert response.status_code == 200
    assert response.headers["content-type"] == "audio/mpeg"
    with tempfile.NamedTemporaryFile(suffix=".mp3") as f:
        f.write(response.content)
        f.flush()
        assert os.path.getsize(f.name) > 0


def test_speech_to_text():
    with open("tests/test_audio.wav", "rb") as f:
        response = client.post("/speech/speech-to-text", files={"file": f})
    assert response.status_code == 200
    assert "text" in response.json()
    assert response.json()["text"] == "hello world"
