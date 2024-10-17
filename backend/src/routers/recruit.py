from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

router = APIRouter(prefix="/v0/recruit")


class RecruitResponse(BaseModel):
    name: str
    star: int
    prob: float


@router.get("", response_model=list[RecruitResponse])
async def get_recruit():
    data = [
        {"name": "요시미", "star": 1, "prob": 0.785},
        {"name": "아이리", "star": 2, "prob": 0.993},
        {"name": "나츠", "star": 3, "prob": 1.0},
    ]
    return JSONResponse(content=data)
