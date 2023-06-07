from fastapi import APIRouter
from ..util.library_models import PracticeRqst, VocabRqst, Word, WordList
import os
from dotenv import load_dotenv
from pymongo import MongoClient
load_dotenv()

# Access environment variable
connection_string = os.getenv("MONGODB_CONNECTION_STRING")

# DB Connection

# Connect to MongoDB
# with open('../../config.json') as config_file:
#     config_data = json.load(config_file)

# connectionString = config_data["Database"]["connectionString"]
# # print(connectionString)
# client = MongoClient(connectionString, tlsCAFile=ca)

# # Access the database
# db = client["WordWizardDB"] 
# -----------------------------------------------------------------------

router = APIRouter()


@router.get('/')
def get_practice():
    client = MongoClient(connection_string)
    db = client["WordWizardDB"]
    collection = db["Parents"] 

    documents = collection.find()

    for document in documents:
        print(document)
    client.close()
    return {'reading': 'reading'}

# @router.post('/practice')
# def create_reading(reading: PracticeRqst):
#     wordList = WordList(words=[
#         Word(word='practice', defenition='defenition'), 
#         Word(word='word', defenition='defenition')
#     ])
#     return wordList

@router.post('/practice')
def create_reading(practice: PracticeRqst):
    client = MongoClient(connection_string)
    db = client["WordWizardDB"]
    collection = db["PracticeList"]
    result = collection.find_one({"child_id": practice.userID})
    if result is None:
        print("No practice list found")
        return None
    print(result["words"])
    client.close()
    return {'reading': 'reading'}


@router.post('/vocab')
def get_vocab(vocab: VocabRqst):
    client = MongoClient(connection_string)
    db = client["WordWizardDB"]
    # Access the collection
    vocab_collection = db["Vocabulary"]
    # Get the relevant vocab list
    print(vocab.userID)
    result = vocab_collection.find_one({"child_id": vocab.userID})
    print(result["words"])

    wordList = WordList(words=[
        Word(word='vocab', defenition='defenition'), 
        Word(word='word', defenition='defenition')
    ])

    wordList = result
    client.close()
    return wordList