from pydantic import BaseModel


class StatisticsReq(BaseModel):
    child_id: str


class LevelStat:
    def __init__(self, level: int, score: int, completed: bool, date: str):
        self.level = level
        self.score = score
        self.completed = completed
        self.date = date


class ProgressHistory:
    def __init__(self, date: str):
        self.date = date
        self.levelsStats = []

    def add_levelStat(self, levelStat: LevelStat):
        self.levelsStats.append(levelStat)
