from fastapi import APIRouter
from ..util.achievements_models import AwardsRqst, AwardSection, Award, AwardsList
from bson import ObjectId
from ...deps import Database
db = Database.getInstance().db
router = APIRouter()

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
            award = Award(goal=award_data["goal"], progress=1, description=award_data["description"], completed=award_data["completed"], img=award_data["img"])
            award_section.add_award(award)
        awards_list.add_section(award_section)
    return awards_list.awardSections