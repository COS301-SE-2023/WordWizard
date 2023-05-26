from fastapi import FastAPI
from .vocab.api.vocab import router as vocab_router
from .reading.api.reading import router as reading_router

app = FastAPI()

app.include_router(vocab_router, prefix="/vocab", tags=["vocab"])
app.include_router(reading_router, prefix="/reading", tags=["reading"])

