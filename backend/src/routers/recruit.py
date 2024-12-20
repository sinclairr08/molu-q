from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.service.recruitService import (
    read_current_pickup,
    read_pickup_probability,
    read_recruit_probability,
)

router = APIRouter(prefix="/v0/recruit")


class RecruitResponse(BaseModel):
    name: str
    star: int
    prob: float
    isLimited: bool


class RecruitResponses(BaseModel):
    noraml: list[RecruitResponse]
    final: list[RecruitResponse]


class RecruitPickupResponse(BaseModel):
    name: str


@router.get("", response_model=RecruitResponses)
async def get_recruit():
    data = read_recruit_probability()
    return JSONResponse(content=data)


@router.get("/pickup/current", response_model=list[RecruitPickupResponse])
async def get_pickup_current():
    data = read_current_pickup()
    return JSONResponse(content=data)


@router.get("/pickup/{name}", response_model=RecruitResponses)
async def get_pickup_recruit(name: str):
    data = read_pickup_probability(name)
    return JSONResponse(content=data)
