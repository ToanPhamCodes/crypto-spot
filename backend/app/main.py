from fastapi import FastAPI, HTTPException, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from db import db
from populate import populateJohn, populateJane


from models.cards import Card
from models.user import User
from models.account import Account

from routes.user import app as userRouter
from routes.auth import app as authRouter
# from routes.account import app as accountRouter

app = FastAPI()

# populateJohn()
# populateJane()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.add_middleware(SessionMiddleware, secret_key="your_secret_key")

@app.get("/")
async def root():
    return {"message": "Server is online"}


# User routes
app.include_router(userRouter)  # prefix="/users", tags=["users"]
app.include_router(authRouter)  # prefix="/auth", tags=["auth"]
# app.include_router(accountRouter) # prefix="/accounts", tags=["accounts"]gl