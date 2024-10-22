from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["molu-q"]


def read_recruit_probability():
    collection = db["students"]
    star1_p = 0.785
    star2_p = 0.185
    star3_p = 0.03

    star1_list = list(collection.find({"star": 1}, {"_id": 0}))
    star2_list = list(collection.find({"star": 2}, {"_id": 0}))
    star3_list = list(collection.find({"star": 3}, {"_id": 0}))

    l1 = len(star1_list)
    l2 = len(star2_list)
    l3 = len(star3_list)

    results = []

    for i, s1 in enumerate(star1_list):
        result = dict(s1)
        result["prob"] = ((i + 1) / l1) * star1_p
        results.append(result)

    for i, s2 in enumerate(star2_list):
        result = dict(s2)
        result["prob"] = ((i + 1) / l2) * star2_p + star1_p
        results.append(result)

    for i, s3 in enumerate(star3_list):
        result = dict(s3)
        result["prob"] = ((i + 1) / l3) * star3_p + star1_p + star2_p

        results.append(result)

    return results
