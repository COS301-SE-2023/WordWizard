from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList

# DB Connection
from pymongo import MongoClient
import certifi
import json

ca = certifi.where()

# Connect to MongoDB
with open('config.json') as config_file:
    config_data = json.load(config_file)

connectionString = config_data["Database"]["connectionString"]
print(connectionString)
client = MongoClient(connectionString, tlsCAFile=ca)

# Access the database
db = client["WordWizardDB"] 
# -----------------------------------------------------------------------

router = APIRouter()

@router.get('/')
def get_practice():
    return {'reading': 'reading'}

@router.post('/practice')
def create_reading(reading: PracticeRqst):
    wordList = WordList(words=[
        Word(word='practice', defenition='defenition'), 
        Word(word='word', defenition='defenition')
    ])
    return wordList

@router.post('/vocab')
def create_vocab(vocab: VocabRqst):



    wordList = WordList(words=[
        Word(word='vocab', defenition='defenition'), 
        Word(word='word', defenition='defenition')
    ])
    return wordList
