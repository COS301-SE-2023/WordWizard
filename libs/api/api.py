from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .stage.api.stage import router as stage_router
from .vocab.api.vocab import router as vocab_router
from .reading.api.reading import router as reading_router
from .library.api.library import router as library_router
from .speech.api.speech import router as speech_router
from .add_child.api.add_child import router as add_child_router
from .child.api.child import router as child_router
from .achievements.api.achievements import router as achievements_router
from .statistics.api.statistics import router as statistics_router
from .parent.api.parent import router as parent_router
import jwt
from dotenv import load_dotenv
import os
from typing import Optional
load_dotenv()

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JWT_KEY = os.getenv("WW_JWT_SECRET")

def validate_token(authorization: Optional[str] = Depends()):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        token_type, token = authorization.split(" ")
        if token_type.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid token type")

        payload = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token")

app.include_router(vocab_router, prefix="/vocab", tags=["vocab"], dependencies=[Depends(validate_token)])
app.include_router(reading_router, prefix="/reading", tags=["reading"], dependencies=[Depends(validate_token)])
app.include_router(stage_router, prefix="/stage", tags=["stage"], dependencies=[Depends(validate_token)])
app.include_router(library_router, prefix="/library", tags=["library"], dependencies=[Depends(validate_token)])
app.include_router(speech_router, prefix="/speech", tags=["speech"], dependencies=[Depends(validate_token)])
app.include_router(add_child_router, prefix="/add-child", tags=["add_child"], dependencies=[Depends(validate_token)])
app.include_router(child_router, prefix="/child", tags=["child"], dependencies=[Depends(validate_token)])
app.include_router(achievements_router, prefix="/achievements", tags=["achievements"], dependencies=[Depends(validate_token)])
app.include_router(statistics_router, prefix="/statistics", tags=["statistics"], dependencies=[Depends(validate_token)])
app.include_router(parent_router, prefix="/parent", tags=["parent"], dependencies=[Depends(validate_token)])
