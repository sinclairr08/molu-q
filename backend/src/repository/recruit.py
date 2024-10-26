from datetime import datetime

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


def read_recruit_probability():
    collection = db["students"]
    star_probs = [(1, 0.785), (2, 0.185), (3, 0.03)]

    results = []
    cumul_probs = 0.0

    for star, probs in star_probs:
        student_list = list(collection.find({"star": star}, {"_id": 0}))
        num_student = len(student_list)

        for i, student in enumerate(student_list):
            result = dict(student)
            result["prob"] = ((i + 1) / num_student) * probs + cumul_probs
            results.append(result)

        cumul_probs += probs

    return results


def read_pickup_probability(name):
    collection = db["students"]
    star_probs = [(1, 0.785), (2, 0.185), (3, 0.023), (4, 0.007)]

    results = []
    cumul_probs = 0.0

    for star, probs in star_probs:
        if star == 3:
            student_list = list(
                collection.find({"star": 3, "name": {"$ne": name}}, {"_id": 0})
            )
        elif star == 4:
            student_list = list(collection.find({"name": name}, {"_id": 0}))
        else:
            student_list = list(collection.find({"star": star}, {"_id": 0}))
        num_student = len(student_list)

        print(student_list)

        for i, student in enumerate(student_list):
            result = dict(student)
            result["prob"] = ((i + 1) / num_student) * probs + cumul_probs
            results.append(result)

        cumul_probs += probs

    return results


def read_current_pickup():
    collection = db["pickups"]
    current_dt = datetime.now()

    query = {"start_dt": {"$lte": current_dt}, "end_dt": {"$gt": current_dt}}
    results = list(collection.find(query, {"name": 1, "_id": 0}))
    return results
