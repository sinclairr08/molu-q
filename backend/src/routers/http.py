import json
import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

router = APIRouter(prefix="/v0/http")


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


@router.get("/http", response_model=list[HttpResponse])
async def read_http():
    data = await read_file(f"{os.path.dirname(__file__)}/local/http.json")
    return JSONResponse(content=data)


@router.get("/http/{code}", response_model=HttpDetailResponse)
async def read_http_detail(code: int):
    data = await read_file(f"{os.path.dirname(__file__)}/local/http/{code}.json")
    return JSONResponse(content=data)
