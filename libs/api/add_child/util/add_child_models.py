from pydantic import BaseModel


class AddChildRqst(BaseModel):
    parent_email: str
    parent_name: str
    name: str
    age: int
    profile_picture: str
