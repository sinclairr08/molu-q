from typing import Optional

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.db import (
    add_quiz,
    read_answer_by_set_problem_id,
    read_quiz_by_set_id,
    read_quiz_sets,
)

router = APIRouter(prefix="/v0/quiz")


class QuizResponse(BaseModel):
    problemUid: int
    quizSetId: int
    problemId: int
    problemType: str
    question: str
    musicPath: Optional[str]
    selectList: Optional[list[str]]


class QuizAnswerResponse(BaseModel):
    answer: str


class QuizRequest(BaseModel):
    quizSetId: int
    problemId: int
    problemType: str
    question: str
    answer: str


class QuizSetResponse(BaseModel):
    quizSetId: int
    quizSetDescription: str


@router.get("/sets", response_model=list[QuizSetResponse])
async def get_quiz_sets():
    data = read_quiz_sets()
    return JSONResponse(content=data)


@router.get("/sets/{set_id}", response_model=list[QuizResponse])
def get_quiz_by_set_id(set_id: int):
    data = read_quiz_by_set_id(set_id)
    return JSONResponse(content=data)


@router.post("")
def create_quiz(quiz: QuizRequest):
    add_quiz(quiz)
    return JSONResponse(content=f"quiz {quiz.problemId} added successfully")


@router.get(
    "/sets/{set_id}/answer/{problem_id}", response_model=list[QuizAnswerResponse]
)
def get_quiz_by_set_problem_id(set_id: int, problem_id: int):
    data = read_answer_by_set_problem_id(set_id, problem_id)
    return JSONResponse(content=data)
