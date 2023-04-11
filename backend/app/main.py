from fastapi import FastAPI
from db import db
from populate import populateJohn, populateJane

from models.cards import Card
from models.user import User
from models.account import Account

from routes.user import app as userRouter
from routes.account import app as accountRouter

app = FastAPI()

# populateJohn()
# populateJane()

@app.get("/")
async def root():
    return {"message": "Server is online"}


# User routes
app.include_router(userRouter)  # prefix="/users", tags=["users"]
app.include_router(accountRouter) # prefix="/accounts", tags=["accounts"]