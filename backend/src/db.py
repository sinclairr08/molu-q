from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


def read_quiz():
    collection = db["quiz_ids"]

    return collection.find({}, {"_id": 0})


def read_quiz_by_id(quiz_id: int):
    collection = db["quiz"]
    if quiz_id == 0:
        return collection.find({}, {"_id": 0})

    return collection.find({"quiz_id": quiz_id}, {"_id": 0})
