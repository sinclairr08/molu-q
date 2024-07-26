import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/quiz")
async def read_quiz():
    try:
        # TODO: file -> db
        file_path = f"{os.path.dirname(__file__)}/local/quiz.json"
        with open(file_path, "r") as f:
            data = json.load(f)
        
        return JSONResponse(content=data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
