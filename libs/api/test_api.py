from fastapi import FastAPI
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

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reading_router, prefix="/reading", tags=["reading"])
app.include_router(stage_router, prefix="/stage", tags=["stage"])
app.include_router(library_router, prefix="/library", tags=["library"])
app.include_router(speech_router, prefix="/speech", tags=["speech"])
app.include_router(add_child_router, prefix="/add-child", tags=["add_child"])
app.include_router(child_router, prefix="/child", tags=["child"])
app.include_router(achievements_router, prefix="/achievements", tags=["achievements"])
app.include_router(statistics_router, prefix="/statistics", tags=["statistics"])
app.include_router(parent_router, prefix="/parent", tags=["parent"])