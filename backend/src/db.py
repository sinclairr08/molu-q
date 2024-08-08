from typing import Union

from pymongo import MongoClient
from pymongo.cursor import Cursor

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


def drop_id(documents: Union[list, Cursor]) -> list:
    return [{k: v for k, v in doc.items() if k != "_id"} for doc in documents]


def read_quiz():
    collection = db["quiz_ids"]
    documents = collection.find({})

    return drop_id(documents)


def read_quiz_by_id(quiz_id: int):
    collection = db["quiz"]
    if quiz_id == 0:
        documents = collection.find({})
    else:
        documents = collection.find({"quiz_id": quiz_id})

    return drop_id(documents)
