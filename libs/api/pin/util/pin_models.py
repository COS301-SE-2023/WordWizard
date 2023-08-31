from pydantic import BaseModel

class ResetPinReq(BaseModel):
    parent_id: str
    validate_password: str
    new_pin: str

class ResetPinRsp(BaseModel):
    message: str
    status_code: bool

class PinReq(BaseModel):
    parent_id: str

class PinRsp(BaseModel):
    pin: str
