def read_recruit_probability():
    star1_p = 0.785
    star2_p = 0.185
    star3_p = 0.03

    star1_list = ["요시미", "아스나", "세리나"]
    star2_list = ["아이리", "세리카", "마리"]
    star3_list = ["카즈사", "나츠", "이오리", "레이사"]

    l1 = len(star1_list)
    l2 = len(star2_list)
    l3 = len(star3_list)

    results = []

    for i, s1 in enumerate(star1_list):
        result = {"name": s1, "star": 1, "prob": ((i + 1) / l1) * star1_p}
        results.append(result)

    for i, s2 in enumerate(star2_list):
        result = {"name": s2, "star": 2, "prob": ((i + 1) / l2) * star2_p + star1_p}
        results.append(result)

    for i, s3 in enumerate(star3_list):
        result = {
            "name": s3,
            "star": 3,
            "prob": ((i + 1) / l3) * star3_p + star1_p + star2_p,
        }
        results.append(result)

    return results
