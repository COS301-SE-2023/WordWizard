from pydantic import BaseModel

class SetPinReq(BaseModel):
    parent_email: str
    new_pin: str
    validation_word: str
class ValidatePasswordReq(BaseModel):
    parent_email: str
    validation_word: str
class SetPinRsp(BaseModel):
    message: str
    status_code: bool

class PinReq(BaseModel):
    parent_email: str

class PinRsp(BaseModel):
    pin: str

class User(BaseModel):
    email: str
