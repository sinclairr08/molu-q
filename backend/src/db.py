from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]
collection = db["quiz"]


def read_quiz(quiz_id: int):
    if quiz_id == 0:
        documents = collection.find({})
    else:
        documents = collection.find({"quiz_id": quiz_id})

    return [{k: v for k, v in doc.items() if k != "_id"} for doc in documents]
