from fastapi import APIRouter
from ..util.achievements_models import AwardsRqst, AwardSection, Award, AwardsList
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
import mongomock
load_dotenv()
from bson import ObjectId

router = APIRouter()
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]



@router.post('/')
def get_Awards(rqst: AwardsRqst):
    progress_collection = db["Progress"]
    result = progress_collection.find_one({"_id": ObjectId(rqst.child_id)})
    if result is None:
        return { "Status": "Error" }
    awards_list = AwardsList() 
    for section_name, section_data in result["awards"].items():
        award_section = AwardSection(name=section_name)
        for award_name, award_data in section_data.items():
            goal = award_data["goal"]
            progress = award_data["progress"]
            description = award_data["description"]
            completed = award_data["completed"]
            img = award_data["img"]
            award = Award(goal=goal, progress=progress, description=description, completed=completed, img=img)
            award_section.add_award(award)
        awards_list.add_section(award_section)
    return awards_list.awardSections