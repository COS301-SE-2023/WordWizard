from pydantic import BaseModel

class reading(BaseModel):
    word: str
    definition: str