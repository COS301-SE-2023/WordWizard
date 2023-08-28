import os
from dotenv import load_dotenv
load_dotenv()
from .helper import santise_string
api_key = os.getenv("OPEN_AI_KEY")

def query(query:str):
    q = "Sentence: The wizards subbed their toys.\nFocus Words: wizards, subbed"
    return santise_string(q)

