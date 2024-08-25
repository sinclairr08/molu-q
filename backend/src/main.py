from fastapi import FastAPI
from src.routers import http, quiz

app = FastAPI()
app.include_router(quiz.router)
app.include_router(http.router)
