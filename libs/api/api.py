from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from .stage.api.stage import router as stage_router
from .reading.api.reading import router as reading_router
from .library.api.library import router as library_router
from .speech.api.speech import router as speech_router
from .add_child.api.add_child import router as add_child_router
from .child.api.child import router as child_router
from .achievements.api.achievements import router as achievements_router
from .statistics.api.statistics import router as statistics_router
from .parent.api.parent import router as parent_router
from .pin.api.pin import router as pin_router

import jwt
from dotenv import load_dotenv
import os
from typing import Optional
from cryptography import x509
from cryptography.hazmat.backends import default_backend

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

AUTH0_PUBLIC_KEY = os.getenv("AUTH0_PUBLIC_KEY")

def validate_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        token_type, token = authorization.split(" ")
        if token_type.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid token type")

        certificate = x509.load_pem_x509_certificate(AUTH0_PUBLIC_KEY.encode(), default_backend())
        public_key = certificate.public_key()

        payload = jwt.decode(token, public_key, algorithms=["RS256"], audience=os.getenv("AUTH0_AUDIENCE"), issuer=os.getenv("AUTH0_ISSUER"))
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token validation failed: {str(e)}")


app.include_router(vocab_router, prefix="/vocab", tags=["vocab"])
app.include_router(reading_router, prefix="/reading", tags=["reading"])
app.include_router(stage_router, prefix="/stage", tags=["stage"])
app.include_router(library_router, prefix="/library", tags=["library"])
app.include_router(speech_router, prefix="/speech", tags=["speech"])
app.include_router(add_child_router, prefix="/add-child", tags=["add_child"])
app.include_router(child_router, prefix="/child", tags=["child"])
app.include_router(achievements_router, prefix="/achievements", tags=["achievements"])
app.include_router(statistics_router, prefix="/statistics", tags=["statistics"])
app.include_router(parent_router, prefix="/parent", tags=["parent"])
app.include_router(pin_router, prefix="/pin", tags=["pin"])
