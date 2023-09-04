import os
from dotenv import load_dotenv
from pymongo import MongoClient
load_dotenv()

class Database:
    __instance = None
    @staticmethod
    def getInstance():
        if Database.__instance == None:
            Database()
        return Database.__instance 
    def __init__(self):
        if Database.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            client = MongoClient(os.getenv("MONGODB_CONNECTION_STRING"))
            self.db = client["WordWizardDB"]
            Database.__instance = self