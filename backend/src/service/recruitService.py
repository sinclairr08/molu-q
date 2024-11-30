from datetime import datetime

from src.repository.recruitRepository import (
    read_current_pickup_db,
    read_star_students_db,
)


def get_probability(star_probs, pickup_name=None):
    results = []
    cumul_probs = 0.0

    for star, probs in star_probs:
        student_list = read_star_students_db(star, pickup_name)
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


def read_pickup_probability(pickup_name):

    normal_star_probs = [(1, 0.785), (2, 0.185), (3, 0.023), (4, 0.007)]
    final_star_probs = [(2, 0.97), (3, 0.023), (4, 0.007)]

    total_probs = {
        "normal": get_probability(normal_star_probs, pickup_name),
        "final": get_probability(final_star_probs, pickup_name),
    }

    return total_probs


def read_current_pickup():
    current_dt = datetime.now()
    return read_current_pickup_db(current_dt)
