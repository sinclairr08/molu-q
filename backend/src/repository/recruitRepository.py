from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


def read_star_students_db(star, pickup_name):
    collection = db["students"]

    if star == 3 and pickup_name:
        query = {"star": 3, "isLimited": False, "name": {"$ne": pickup_name}}
    elif star == 4 and pickup_name:
        query = {"name": pickup_name}
    else:
        query = {"star": star, "isLimited": False}

    return list(collection.find(query, {"_id": 0}))


def read_current_pickup_db(dt):
    collection = db["pickups"]

    query = {"start_dt": {"$lte": dt}, "end_dt": {"$gt": dt}}
    results = list(collection.find(query, {"name": 1, "_id": 0}))
    return results
