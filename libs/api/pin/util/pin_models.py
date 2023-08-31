from pydantic import BaseModel

class SetPinReq(BaseModel):
    parent_id: str
    new_pin: str
class ValidatePasswordReq(BaseModel):
    parent_id: str
    validation_word: str
class SetPinRsp(BaseModel):
    message: str
    status_code: bool

class PinReq(BaseModel):
    parent_id: str

class PinRsp(BaseModel):
    pin: str
