from pydantic import BaseModel

class DeleteParentRqst(BaseModel):
    parent_email: str