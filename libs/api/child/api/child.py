from fastapi import APIRouter
from ..util.child_models import GetChildrenReq
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
load_dotenv()


router = APIRouter()

connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]

@router.post('/')
def add_create(rqst: GetChildrenReq):