from pydantic import BaseModel

class Voc(BaseModel):
    word: str
    definition: str
