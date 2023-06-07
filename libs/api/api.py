from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from vocab.api.vocab import router as vocab_router
from reading.api.reading import router as reading_router
from library.api.library import router as library_router

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(vocab_router, prefix="/vocab", tags=["vocab"])
app.include_router(reading_router, prefix="/reading", tags=["reading"])
app.include_router(library_router, prefix="/library", tags=["library"])

