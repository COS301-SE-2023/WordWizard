from fastapi import APIRouter
import os
import hashlib
from dotenv import load_dotenv
from ..util.pin_models import (
    SetPinReq,
    ValidatePasswordReq,
    SetPinRsp,
    PinReq,
    PinRsp,
    User,
)
from pymongo import MongoClient
from bson import ObjectId
from ...verify_email import send, generate_verification_code

load_dotenv()


router = APIRouter()

connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]


@router.post("/add-pin")
def add_pin(rqst: SetPinReq):
    parent_collection = db["Parents"]
    parent = parent_collection.find_one({"email": rqst.parent_email})
    if parent:
        parent_collection.update_one(
            {"email": rqst.parent_email},
            {"$set": {"validation_word": rqst.validation_word, "pin": rqst.new_pin}},
        )
        return {"message": "Pin successfully made", "status_code": True}
    else:
        return {"message": "Parent not found", "status_code": False}


@router.post("/change-pin")
def change_pin(rqst: SetPinReq):
    parent_collection = db["Parents"]
    parent = parent_collection.find_one({"email": rqst.parent_email})
    if parent:
        parent_collection.update_one(
            {"email": rqst.parent_email}, {"$set": {"pin": rqst.new_pin}}
        )
        return {"message": "Pin successfully changed", "status_code": True}
    else:
        return {"message": "Parent not found", "status_code": False}


@router.post("/get-pin")
def get_pin(rqst: PinReq):
    parent_collection = db["Parents"]
    parent = parent_collection.find_one({"email": rqst.parent_email})
    if "pin" in parent:
        return parent["pin"]
    return ""


@router.post("/forgot-pin")
def forgot_pin(rqst: User):
    code = generate_verification_code()
    html = f"""
    <html>
      <body>
        <h2>Reset Pin</h2>
        <p>Hello,</p>
        <p style='color:black'>Please use the following verification code to reset your pin: <strong>{code}</strong></p>
        <p>Thank you!</p>
      </body>
    </html>
    """
    send(rqst.email, code, msg=html)
    return {"code": code, "status": "success"}
