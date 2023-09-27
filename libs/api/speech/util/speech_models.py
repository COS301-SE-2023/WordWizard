from pydantic import BaseModel


class AudioRqst(BaseModel):
    text: str
