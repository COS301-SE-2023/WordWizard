from fastapi import FastAPI
from firebase import firebase
from dotenv import dotenv_values
import firebase_admin

env_variables = dotenv_values(".env")
firebase_config = {
    "apiKey": env_variables['NX_FIREBASE_API_KEY'],
    "authDomain": env_variables['NX_FIREBASE_AUTH_DOMAIN'],
    "databaseURL": env_variables['NX_FIREBASE_DATABASE_URL'],
    "projectId": env_variables['NX_FIREBASE_PROJECT_ID'],
    "storageBucket": env_variables['NX_FIREBASE_STORAGE_BUCKET'],
    "messagingSenderId": env_variables['NX_FIREBASE_MESSAGING_SENDER_ID'],
    "appId": env_variables['NX_FIREBASE_APP_ID'],
    "measurementId": env_variables['NX_FIREBASE_MEASUREMENT_ID']
}

# firebase_client = firebase.FirebaseApplication(firebase_config['databaseURL'])
# print(firebase_config)

cred_obj = firebase_admin.credentials.Certificate(firebase_config)
default_app = firebase_admin.initialize_app(cred_obj, {
    'databaseURL':"././././"
    })

app = FastAPI()

inventory = {
    1: {
        "name": "Eggs",
        "price": 1.99,
        "brand": "Happy Eggs, Inc.",
    }
}

@app.get("/")
def home():
    return {"Hello": "World"}

@app.get("/about")
def about():
    return {"about": "this is about page"}
