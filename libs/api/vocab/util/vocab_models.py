from pydantic import BaseModel

class Vocab(BaseModel):
    word: str
    definition: str
