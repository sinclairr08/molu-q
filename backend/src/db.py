from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


def read_quiz_sets() -> list:
    collection = db["quiz_sets"]

    return list(collection.find({}, {"_id": 0}))


def read_quiz_by_set_id(set_id: int) -> list:
    collection = db["quizs"]
    if set_id == 0:
        return list(collection.find({}, {"_id": 0, "answer": 0}))

    return list(collection.find({"quizSetId": set_id}, {"_id": 0, "answer": 0}))
