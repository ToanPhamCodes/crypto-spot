from fastapi import FastAPI
from db import db
from populate import populateJohn, populateJane

from models.cards import Card
from models.user import User
from models.account import Account

app = FastAPI()

populateJohn()
populateJane()

@app.get("/")
async def root():
    return {"message": "Server is online"}