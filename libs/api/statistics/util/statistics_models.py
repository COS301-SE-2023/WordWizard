from pydantic import BaseModel

class ProgressReq(BaseModel):
    child_id: str
