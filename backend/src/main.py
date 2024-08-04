import json
import os
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()


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


class HttpResponse(BaseModel):
    code: int
    message: str
    ext: str


class HttpDetailResponse(BaseModel):
    message: str
    ext: str
    description: str


async def read_file(fn):
    try:
        with open(fn, "r") as f:
            data = json.load(f)
        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/quiz", response_model=list[QuizResponse])
async def read_quiz():
    data = await read_file(f"{os.path.dirname(__file__)}/local/quiz.json")
    return JSONResponse(content=data)


@app.get("/v0/quiz", response_model=list[QuizIdResponse])
async def read_quiz_ids():
    data = await read_file(f"{os.path.dirname(__file__)}/local/quiz_ids.json")
    return JSONResponse(content=data)


@app.get("/http", response_model=list[HttpResponse])
async def read_http():
    data = await read_file(f"{os.path.dirname(__file__)}/local/http.json")
    return JSONResponse(content=data)


@app.get("/http/{code}", response_model=HttpDetailResponse)
async def read_http_detail(code: int):
    data = await read_file(f"{os.path.dirname(__file__)}/local/http/{code}.json")
    return JSONResponse(content=data)
