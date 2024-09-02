from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from src.routers import http, quiz

app = FastAPI()
app.include_router(quiz.router)
app.include_router(http.router)


@app.post("/v0/upload")
def upload(
    problemId: int = Form(...),
    image: UploadFile = File(...),
    imageName: str = Form(...),
):
    with open(imageName, "wb") as f:
        f.write(image.file.read())

    return JSONResponse(content="OK")
