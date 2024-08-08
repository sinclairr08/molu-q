from typing import Optional

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.db import read_quiz, read_quiz_by_id

router = APIRouter()


class QuizResponse(BaseModel):
    problemNo: int
    problemType: str
    question: str
    musicPath: Optional[str]
    answerList: Optional[list[str]]
    answer: str


class QuizIdResponse(BaseModel):
    quizId: int
    quizDescription: str


@router.get("/v0/quiz", response_model=list[QuizIdResponse])
async def get_quiz_ids():
    data = read_quiz()
    return JSONResponse(content=data)


@router.get("/v0/quiz/{quiz_id}", response_model=list[QuizIdResponse])
def get_quiz_by_id(quiz_id: int):
    data = read_quiz_by_id(quiz_id)
    return JSONResponse(content=data)
