import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

async def read_file(fn):
    try:
        with open(fn, "r") as f:
            data = json.load(f)
        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/quiz")
async def read_quiz():
    data = await read_file(f"{os.path.dirname(__file__)}/local/quiz.json")
    return JSONResponse(content=data)
        

@app.get("/http")
async def read_http():
    data = await read_file(f"{os.path.dirname(__file__)}/local/http.json")
    return JSONResponse(content=data)

    
@app.get("/http/{code}")
async def read_http_detail(code: int):
    data = await read_file(f"{os.path.dirname(__file__)}/local/http/{code}.json")
    return JSONResponse(content=data)

