import os

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from src.routers import http, quiz, recruit

app = FastAPI()
app.include_router(quiz.router)
app.include_router(http.router)
app.include_router(recruit.router)

load_dotenv()
IMAGE_SERVER_URL = os.getenv("IMAGE_SERVER_URL")
AUDIO_SERVER_URL = os.getenv("AUDIO_SERVER_URL")


@app.post("/v0/upload/image")
def upload_image(
    image: UploadFile = File(...),
    imageId: str = Form(...),
):
    with open(f"images/{imageId}", "wb") as f:
        f.write(image.file.read())

    return JSONResponse(content={"filePath": f"{IMAGE_SERVER_URL}/images/{imageId}"})


@app.post("/v0/upload/audio")
def upload_audio(
    audio: UploadFile = File(...),
    audioId: str = Form(...),
):
    with open(f"audios/{audioId}", "wb") as f:
        f.write(audio.file.read())

    return JSONResponse(content={"filePath": f"{IMAGE_SERVER_URL}/audios/{audioId}"})


app.mount("/images", StaticFiles(directory="images"))
app.mount("/audios", StaticFiles(directory="audios"))
