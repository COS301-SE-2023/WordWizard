import os
from dotenv import load_dotenv
import openai
load_dotenv()
from .helper import santise_string
api_key = os.getenv("OPEN_AI_KEY")
openai.api_key = api_key

def query(query:str):
    q = "Sentence: The wizards subbed their toys.\nFocus Words: wizards, subbed"
    print(query)
    # q = query_chat(query)
    return santise_string(q)

def query_chat(query:str):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": query
            }
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response["choices"][0]["message"]["content"]
