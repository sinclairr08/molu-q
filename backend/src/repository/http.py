from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


def read_https() -> list:
    collection = db["https"]

    return list(collection.find({}, {"_id": 0}))


def read_http_by_code(code: int) -> list:
    collection = db["https"]

    return collection.find_one({"code": code}, {"_id": 0})


def create_http(http):
    collection = db["https"]
    result = collection.find_one({"code": http["code"]}, {"_id": 0})

    if result is not None and len(result) > 0:
        return False

    collection.insert_one(http)
    return True
