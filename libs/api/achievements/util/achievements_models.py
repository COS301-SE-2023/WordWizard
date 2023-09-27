from pydantic import BaseModel
from typing import Optional


class AwardsRqst(BaseModel):
    child_id: str


class Award:
    def __init__(
        self, goal: int, progress: int, description: str, completed: bool, img: str
    ):
        self.goal = goal
        self.progress = progress
        self.description = description
        self.completed = completed
        self.img = img


class AwardSection:
    def __init__(self, name: str):
        self.name = name
        self.awards = []  # List to store the awards

    def add_award(self, award: Award):
        self.awards.append(award)


class AwardsList:
    def __init__(self):
        self.awardSections = []

    def add_section(self, section: AwardSection):
        self.awardSections.append(section)
