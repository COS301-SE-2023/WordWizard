from pydantic import BaseModel

class GetChildrenReq(BaseModel):
    parent_email: str
    parent_name: str