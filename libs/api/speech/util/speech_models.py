from pydantic import BaseModel

class AudioRqst(BaseModel):
    text: str

class AudioInBase64(BaseModel):
    audio: str