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


def create_quiz(quiz):
    counters = db["counters"]
    cnt = counters.find_one({"_id": "quiz"}, {"_id": 0})["cnt"]

    collection = db["quizs"]
    quiz["problemUid"] = cnt

    collection.insert_one(quiz)

    counters.update_one({"_id": "quiz"}, {"$set": {"cnt": cnt + 1}})


def read_answer_by_set_problem_id(set_id, problem_id):
    collection = db["quizs"]
    answer = collection.find_one(
        {"quizSetId": set_id, "problemId": problem_id}, {"_id": 0}
    )["answer"]

    return {"answer": answer}
