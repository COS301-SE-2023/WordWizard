from pydantic import BaseModel
from typing import Optional


class LevelRequest(BaseModel):
    progress_id: str
