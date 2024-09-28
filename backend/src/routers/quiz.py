from typing import Optional

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.repository.quiz import (
    create_quiz,
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
    imagePath: Optional[str]
    audioPath: Optional[str]
    audiosPath: Optional[str]
    selectList: Optional[list[str]]


class QuizAnswerResponse(BaseModel):
    answer: str


class QuizRequest(BaseModel):
    quizSetId: int
    problemId: int
    problemType: str
    question: str
    answer: str
    selectList: Optional[list[str]] = None
    imagePath: Optional[str] = None
    audioPath: Optional[str] = None
    audiosPath: Optional[list[str]] = None


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


@router.get(
    "/sets/{set_id}/answer/{problem_id}", response_model=list[QuizAnswerResponse]
)
def get_answer_by_set_problem_id(set_id: int, problem_id: int):
    data = read_answer_by_set_problem_id(set_id, problem_id)
    return JSONResponse(content=data)


@router.post("")
def add_quiz(quiz: QuizRequest):
    create_quiz(quiz.model_dump(exclude_none=True))
    return JSONResponse(content=f"quiz {quiz.problemId} added successfully")
