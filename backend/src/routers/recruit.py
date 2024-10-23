from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.repository.recruit import read_pickup_probability, read_recruit_probability

router = APIRouter(prefix="/v0/recruit")


class RecruitResponse(BaseModel):
    name: str
    star: int
    prob: float


@router.get("", response_model=list[RecruitResponse])
async def get_recruit():
    data = read_recruit_probability()
    return JSONResponse(content=data)


@router.get("/pickup/{name}", response_model=list[RecruitResponse])
async def get_pickup_recruit(name: str):
    data = read_pickup_probability(name)
    return JSONResponse(content=data)
