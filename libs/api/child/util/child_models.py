from pydantic import BaseModel

class GetChildrenReq(BaseModel):
    parent_email: str
    parent_name: str

class GetPreferencesReq(BaseModel):
    child_id: str

class UpdatePreferencesReq(BaseModel):
    child_id: str
    preferences: list

class EditChildReq(BaseModel):
    child_id: str
    name: str
    age: int
    profile_picture: str

class DeleteChildReq(BaseModel):
    child_id: str