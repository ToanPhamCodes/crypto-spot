from fastapi import APIRouter, HTTPException, status
from bson.objectid import ObjectId
from db import db
from models.user import User

app = APIRouter()

#Get a list of all users
@app.get("/users", response_model=list[User])
async def get_users():
    users = db.users.find({})
    return list(users)

#Get a specific user by id

#Create a new user

#Update a user

#Delete a user

