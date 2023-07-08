from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList, UpdateRqst
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
import mongomock
load_dotenv()

router = APIRouter()
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]