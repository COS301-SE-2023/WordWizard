from pydantic import BaseModel

class GetChildrenReq(BaseModel):
    parent_email: str
    parent_name: str

class EditChildReq(BaseModel):
    child_id: str
    name: str
    age: int
    profile_picture: str