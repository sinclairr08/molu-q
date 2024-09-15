from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.repository.http import create_http, read_http_by_code, read_https

router = APIRouter(prefix="/v0/http")


class HttpResponse(BaseModel):
    code: int
    message: str
    imagePath: str


class HttpDetailResponse(BaseModel):
    code: int
    message: str
    imagePath: str
    description: str


class HttpRequest(BaseModel):
    code: int
    message: str
    imagePath: str
    description: str


@router.get("", response_model=list[HttpResponse])
async def get_https():
    data = read_https()
    return JSONResponse(content=data)


@router.get("/{code}", response_model=HttpDetailResponse)
async def get_http_by_code(code: int):
    data = read_http_by_code(code)
    return JSONResponse(content=data)


@router.post("")
def add_quiz(http: HttpRequest):
    succeeded = create_http(http.model_dump(exclude_none=True))
    if succeeded:
        return JSONResponse(status_code=200, content="OK")

    return JSONResponse(status_code=400, content="BAD REQUEST")
