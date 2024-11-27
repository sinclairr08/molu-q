from datetime import datetime

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


query_1 = {"isLimited": False, "name": {"$ne": "abc"}}  # name이 "abc"가 아닌 문서

query = {
    "star": 3,  # star가 3
    "$or": [{"isLimited": False}, {"name": "abc"}],  # isLimited가 False  # name이 "abc"
}


def get_students(star, name=None):
    collection = db["students"]
    if star == 3 and name:
        return list(
            collection.find(
                {"star": 3, "isLimited": False, "name": {"$ne": name}}, {"_id": 0}
            )
        )
    elif star == 4 and name:
        return list(collection.find({"name": name}, {"_id": 0}))
    else:
        return list(collection.find({"star": star, "isLimited": False}, {"_id": 0}))


def get_probability(star_probs, name=None):
    results = []
    cumul_probs = 0.0

    for star, probs in star_probs:
        student_list = get_students(star, name)
        num_student = len(student_list)

        for i, student in enumerate(student_list):
            result = dict(student)
            result["prob"] = ((i + 1) / num_student) * probs + cumul_probs
            results.append(result)

        cumul_probs += probs

    return results


def read_recruit_probability():

    normal_star_probs = [(1, 0.785), (2, 0.185), (3, 0.03)]
    final_star_probs = [(2, 0.97), (3, 0.03)]

    total_probs = {
        "normal": get_probability(normal_star_probs),
        "final": get_probability(final_star_probs),
    }

    return total_probs


def read_pickup_probability(name):

    normal_star_probs = [(1, 0.785), (2, 0.185), (3, 0.023), (4, 0.007)]
    final_star_probs = [(2, 0.97), (3, 0.023), (4, 0.007)]

    total_probs = {
        "normal": get_probability(normal_star_probs, name),
        "final": get_probability(final_star_probs, name),
    }

    return total_probs


def read_current_pickup():
    collection = db["pickups"]
    current_dt = datetime.now()

    query = {"start_dt": {"$lte": current_dt}, "end_dt": {"$gt": current_dt}}
    results = list(collection.find(query, {"name": 1, "_id": 0}))
    return results
