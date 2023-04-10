from fastapi import FastAPI
from app.db import db

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Server is online"}