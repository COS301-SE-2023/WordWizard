from fastapi import FastAPI
from .vocab.api.vocab import router as vocab_router

app = FastAPI()

app.include_router(vocab_router, prefix="/vocab", tags=["vocab"])

