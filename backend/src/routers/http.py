from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.repository.http import read_http_by_code, read_https

router = APIRouter(prefix="/v0/http")


class HttpResponse(BaseModel):
    code: int
    message: str
    imgPath: str


class HttpDetailResponse(BaseModel):
    code: int
    message: str
    imgPath: str
    description: str


@router.get("", response_model=list[HttpResponse])
async def get_https():
    data = read_https()
    return JSONResponse(content=data)


@router.get("/{code}", response_model=HttpDetailResponse)
async def get_http_by_code(code: int):
    data = read_http_by_code(code)
    return JSONResponse(content=data)
