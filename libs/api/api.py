from fastapi import FastAPI
from .vocab.api.vocab import router as vocab_router
from fastapi.middleware.cors import CORSMiddleware
from .reading.api.reading import router as reading_router
from .stage.api.stage import router as stage_router


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
app.include_router(stage_router, prefix="/stage", tags=["stage"])

