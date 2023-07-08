from fastapi import APIRouter
from ..util.achievements_models import AwardsRqst, AwardSection, Award, AwardsList
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dataclasses import dataclass
import mongomock
load_dotenv()

router = APIRouter()
connection_string = os.getenv("MONGODB_CONNECTION_STRING")
client = MongoClient(connection_string)
db = client["WordWizardDB"]


@router.post('/practice')
def get_Awards(rqst: AwardsRqst):
    progress_collection = db["Progress"]
    result = progress_collection.find_one({"child_id": rqst.userID})
    
    if result is None:
        return None
    
    awards_list = AwardsList() # Create an instance of AwardsList
    
    # Retrieve the awards data from the result and create Award objects
    # Add the Award objects to the respective AwardSections in the AwardsList
    for section_name, section_data in result["awards"].items():
        award_section = AwardSection(name=section_name)  # Create an instance of AwardSection
        
        for award_name, award_data in section_data.items():
            goal = award_data["goal"]
            progress = award_data["progress"]
            description = award_data["description"]
            completed = award_data["completed"]
            img = award_data["img"]
            
            award = Award(goal=goal, progress=progress, description=description, completed=completed, img=img)
            award_section.add_award(award)
        
        awards_list.add_section(award_section)
    
    return awards_list

