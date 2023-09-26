import os
import jwt
import hashlib
from pydantic import BaseModel
from passlib.hash import bcrypt
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .stage.api.stage import router as stage_router
from .reading.api.reading import router as reading_router
from .library.api.library import router as library_router
from .speech.api.speech import router as speech_router
from .add_child.api.add_child import router as add_child_router
from .child.api.child import router as child_router
from .achievements.api.achievements import router as achievements_router
from .statistics.api.statistics import router as statistics_router
from .pin.api.pin import router as pin_router
from .verify_email import send, generate_verification_code
from .deps import Database

db = Database.getInstance().db
user_collection = db['user']

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str

class Forgot(BaseModel):
    username: str
    code: str
    password: str
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

def authenticate_user(username: str, password: str):
    user = user_collection.find_one({'username': username})
    if not user:
        return False
    if not verify_password(username, password):
        return False
    return user

@app.post('/token')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail='Invalid username or password')
    user_obj = user_collection.find_one({'username': form_data.username})
    token = jwt.encode({'username': user_obj['username']}, JWT_SECRET)
    return {'access_token': token, 'token_type': 'bearer'}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = user_collection.find_one({'username': payload.get('username')})
    except:
        raise HTTPException(status_code=401, detail='Invalid username or password')
    return {'username': payload.get('username')}

@app.post('/sign-up')
async def create_user(user: User):
    parent_data = {
        'username': user.username,
        'email': user.username,
        'children': []
    }
    db['Parents'].insert_one(parent_data)
    if check_existing(user.username):
        raise HTTPException(status_code=401, detail='Username already exists')
    res = user_collection.insert_one({
        'username': user.username,
        'password_hash': bcrypt.hash(user.password)
    })
    token = jwt.encode({'username':user.username}, JWT_SECRET)
    return {'access_token': token, 'token_type': 'bearer', 'status': 'success'}

@app.post('/login')
async def login_user(user: User):
    if not authenticate_user(user.username, user.password):
        raise HTTPException(status_code=401, detail='Invalid username or password')
    token = jwt.encode({'username':user.username}, JWT_SECRET)
    return {'access_token': token, 'token_type': 'bearer', 'status': 'success'}

@app.post('/verify')
async def verify_user(user: User):
    if check_existing(user.username):
        raise HTTPException(status_code=401, detail='Username already exists')
    code = generate_verification_code()
    send(user.username, code)
    return {'code': hashlib.sha256(code.encode()).hexdigest(), 'status': 'success'}

@app.get('/validate-token')
async def get_user(user: User = Depends(get_current_user)):
    return user

@app.get('/delete')
async def delete_user(user: User = Depends(get_current_user)):
    try:
        result = db["Parents"].find_one({"email": user["username"]})
        for child in result["children"]:
            db["Practice"].delete_one({"_id": child})
            db["Vocabulary"].delete_one({"_id": child})
            db["Progress"].delete_one({"_id": child})
            db["Children"].delete_one({"_id": child})
        db["Parents"].delete_one({"email": user["username"]})
        db["user"].delete_one({"username": user["username"]})
    except Exception as e:
        return { "status" : "error" }
    return { "status" : "success" }

@app.post('/forgot')
async def forgot_password(user: User):
    code = generate_verification_code()
    html = f'''
    <html>
      <body>
        <h2>Reset Password</h2>
        <p>Hello,</p>
        <p style='color:black'>Please use the following verification code to reset your password: <strong>{code}</strong></p>
        <p>Thank you!</p>
      </body>
    </html>
    '''
    send(user.username, code, msg=html)
    user_collection.update_one({'username': user.username}, {'$set': {'code': hashlib.sha256(code.encode()).hexdigest()}})
    return {'code': hashlib.sha256(code.encode()).hexdigest(), 'status': 'success'}

@app.post('/reset')
async def reset_password(user: Forgot):
    user_obj = user_collection.find_one({'username': user.username})
    if not user_obj:
        raise HTTPException(status_code=401, detail='Invalid username')
    if user_obj['code'] != hashlib.sha256(user.code.encode()).hexdigest():
        raise HTTPException(status_code=401, detail='Invalid code')
    user_collection.update_one({'username': user.username}, {'$set': {'password_hash': bcrypt.hash(user.password)}})
    user_collection.update_one({'username': user.username}, {'$unset': {'code': 1}})
    return {'status': 'success'}

@app.get('/items')
async def read_items(token: str = Depends(oauth2_scheme)):
    return {'token': token}

def check_existing(username:str) -> bool:
    if user_collection.find_one({'username': username}):
        return True
    return False

def verify_password(username: str, password: str) -> bool:
    user = user_collection.find_one({'username': username})
    return bcrypt.verify(password, user["password_hash"])


app.include_router(reading_router, prefix="/reading", tags=["reading"], dependencies=[Depends(get_current_user)])
app.include_router(stage_router, prefix="/stage", tags=["stage"], dependencies=[Depends(get_current_user)])
app.include_router(library_router, prefix="/library", tags=["library"], dependencies=[Depends(get_current_user)])
app.include_router(speech_router, prefix="/speech", tags=["speech"], dependencies=[Depends(get_current_user)])
app.include_router(add_child_router, prefix="/add-child", tags=["add_child"], dependencies=[Depends(get_current_user)])
app.include_router(child_router, prefix="/child", tags=["child"], dependencies=[Depends(get_current_user)])
app.include_router(achievements_router, prefix="/achievements", tags=["achievements"], dependencies=[Depends(get_current_user)])
app.include_router(statistics_router, prefix="/statistics", tags=["statistics"], dependencies=[Depends(get_current_user)])
app.include_router(pin_router, prefix="/pin", tags=["pin"], dependencies=[Depends(get_current_user)])
