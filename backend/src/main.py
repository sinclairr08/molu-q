import json
import os

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.routers import quiz

app = FastAPI()
app.include_router(quiz.router)


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


@app.get("/http", response_model=list[HttpResponse])
async def read_http():
    data = await read_file(f"{os.path.dirname(__file__)}/local/http.json")
    return JSONResponse(content=data)


@app.get("/http/{code}", response_model=HttpDetailResponse)
async def read_http_detail(code: int):
    data = await read_file(f"{os.path.dirname(__file__)}/local/http/{code}.json")
    return JSONResponse(content=data)
