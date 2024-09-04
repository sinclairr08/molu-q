from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from src.routers import http, quiz

app = FastAPI()
app.include_router(quiz.router)
app.include_router(http.router)


@app.post("/v0/upload")
def upload(
    image: UploadFile = File(...),
    imageName: str = Form(...),
):
    with open(f"images/{imageName}", "wb") as f:
        f.write(image.file.read())

    return JSONResponse(
        content={"imagePath": f"http://localhost:8000/images/{imageName}"}
    )


app.mount("/images", StaticFiles(directory="images"))
