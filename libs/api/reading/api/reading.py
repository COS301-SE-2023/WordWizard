from fastapi import APIRouter
from ..util.reading_models import (
    PassageRqst,
    Content,
    Word,
    Progress,
    UpdateProgressRqst,
)
from ..util.helper import get_prefixes_suffixes, find_phonotactics, count_syllables
from ..util.Rating import Rating
from bson import ObjectId
from ...deps import Database
import random
from ..util.Rating import Rating
from ..util.passage import query_passage


db = Database.getInstance().db
router = APIRouter()


def get_class(id: str, level: int):
    practice = db["Practice"].find_one({"_id": ObjectId(id)}, {"_id": 0})
    vocab = db["Vocabulary"].find_one({"_id": ObjectId(id)}, {"_id": 0})
    child = db["Children"].find_one({"_id": ObjectId(id)}, {"_id": 0})
    pref = []
    if "preferences" in child:
        pref = child["preferences"]

    chosen = ""
    if len(pref) > 0:
        chosen = random.choice(pref)
    return Rating(vocab["words"], practice["words"], chosen, level)


@router.post("/passage")
def create_reading(reading: PassageRqst):
    q = query_passage(get_class(reading.id, reading.level).generatePrompt())
    return q


@router.post("/update-progress")
def update_progress(updtProgress: UpdateProgressRqst):
    progress_collection = db["Progress"]
    progress = progress_collection.find_one({"_id": ObjectId(updtProgress.child_id)})

    if progress:
        if "level_scores" in progress:
            if progress["level_scores"].get(str(updtProgress.progress.level)):
                if (
                    updtProgress.progress.score
                    > progress["level_scores"][str(updtProgress.progress.level)]
                ):
                    progress["level_scores"][
                        str(updtProgress.progress.level)
                    ] = updtProgress.progress.score

            else:
                progress["level_scores"][
                    str(updtProgress.progress.level)
                ] = updtProgress.progress.score
        else:
            progress["level_scores"] = {
                str(updtProgress.progress.level): updtProgress.progress.score
            }
        if "total_words" in progress:
            progress["total_words"] += (
                len(updtProgress.progress.content)
                - updtProgress.progress.incorrect_words
            )
        else:
            progress["total_words"] = (
                len(updtProgress.progress.content)
                - updtProgress.progress.incorrect_words
            )

        if "incorrect_words_by_level" in progress:
            progress["incorrect_words_by_level"][
                str(updtProgress.progress.level)
            ] = updtProgress.progress.incorrect_words
        progress["average_score"] = 0
        for lvl in progress["level_scores"]:
            progress["average_score"] += int(progress["level_scores"][lvl])
        if len(progress["level_scores"]) > 0:
            progress["average_score"] = progress["average_score"] / len(
                progress["level_scores"]
            )
        else:
            progress["average_score"] = 0

        if (
            progress["highest_score"] == 0
            or updtProgress.progress.score > progress["highest_score"]
        ):
            progress["highest_score"] = updtProgress.progress.score

        newScore = {
            "level": updtProgress.progress.level,
            "score": updtProgress.progress.score,
            "completed": True,
            "date": updtProgress.progress.date,
        }
        progress["progress_history"].append(newScore)

        vocabulary_collection = db["Vocabulary"]
        vocabulary_Total = len(
            vocabulary_collection.find_one({"_id": ObjectId(updtProgress.child_id)})[
                "words"
            ]
        )

        practice_collection = db["Practice"]
        practice_Total = len(
            practice_collection.find_one({"_id": ObjectId(updtProgress.child_id)})[
                "words"
            ]
        )

        awards = progress["awards"]
        lvlMaster = awards.get("Level Master")
        if lvlMaster and isinstance(lvlMaster, dict):
            for award_name, award_details in lvlMaster.items():
                if award_details["goal"] <= len(progress["level_scores"]):
                    award_details["completed"] = True
        wordLearner = awards.get("Word Learner")
        if wordLearner and isinstance(wordLearner, dict):
            for award_name, award_details in wordLearner.items():
                if award_details["goal"] <= progress["total_words"]:
                    award_details["completed"] = True
        practiceEnth = awards.get("Practice Enthusiast")
        if practiceEnth and isinstance(practiceEnth, dict):
            for award_name, award_details in practiceEnth.items():
                if award_details["goal"] <= practice_Total:
                    award_details["completed"] = True
        vocabBuilder = awards.get("Vocabulary Builder")
        if vocabBuilder and isinstance(vocabBuilder, dict):
            for award_name, award_details in vocabBuilder.items():
                if award_details["goal"] <= vocabulary_Total:
                    award_details["completed"] = True
        awards["Level Master"] = lvlMaster
        awards["Word Learner"] = wordLearner
        awards["Practice Enthusiast"] = practiceEnth
        awards["Vocabulary Builder"] = vocabBuilder
        progress["awards"] = awards
        for word in updtProgress.progress.content:
            if word.correct:
                add_vocab(updtProgress.child_id, word.word)
            if not word.correct or word.correct == None:
                add_practice(
                    updtProgress.child_id, word.word, updtProgress.progress.level
                )
        progress_collection.update_one(
            {"_id": ObjectId(updtProgress.child_id)}, {"$set": progress}
        )
        return {"status": "success"}
    return {"status": "failed"}


def add_practice(userID, word, level=1):
    if check_duplicate_words(db["Practice"], userID, word):
        return False
    pref = get_prefixes_suffixes(word)
    db["Practice"].update_one(
        {"_id": ObjectId(userID)}, {"$addToSet": {"words": word}}, upsert=True
    )
    return True


def add_vocab(userID, word):
    if check_duplicate_words(db["Vocabulary"], userID, word):
        return False
    db["Vocabulary"].update_one(
        {"_id": ObjectId(userID)}, {"$addToSet": {"words": word}}, upsert=True
    )
    return True


def check_duplicate_words(collection, user_id, word):
    document = collection.find_one({"_id": ObjectId(user_id), "words": word})
    return document is not None
