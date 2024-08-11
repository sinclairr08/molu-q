from typing import Optional

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.db import read_quiz_by_set_id, read_quiz_sets

router = APIRouter(prefix="/v0/quiz")


class QuizResponse(BaseModel):
    problemUid: int
    quizSetId: int
    problemId: int
    problemType: str
    question: str
    musicPath: Optional[str]
    selectList: Optional[list[str]]


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
