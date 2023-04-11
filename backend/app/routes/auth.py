from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
from typing import Dict
from hashlib import sha256
from pymongo import MongoClient
from db import db
from models.user import User


app = APIRouter()
security = HTTPBasic()

client = MongoClient("mongodb+srv://phamtony1911:123@databasetest.090hg24.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true")
db = client.cryptospot
users_collection = db.users

class SignInInput(BaseModel):
    email: str
    password: str


def get_password_hash(password):
    return password


def sign_in(email: str, password: str):
    email = email.lower()

    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    hashed_password = get_password_hash(password)
    if user["password"] != hashed_password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {"user_id": str(user["_id"]), "email": user["email"]}

def sign_out(request):
    request.session.pop("user_id", None)


@app.post("/auth/signin", response_model=Dict[str, str])
async def authenticate_user(data: SignInInput):
    return sign_in(data.email, data.password)

# def sign_up(user: UserAccount):
#     email = user.email.lower()

#     if users_collection.find_one({"email": email}):
#         raise HTTPException(status_code=400, detail="User already exists")

#     hashed_password = get_password_hash(user.password)
#     user_data = {
#         "first_name": user.first_name,
#         "last_name": user.last_name,
#         "email": email,
#         "hashed_password": hashed_password
#     }
#     user_id = users_collection.insert_one(user_data).inserted_id
#     return {"user_id": str(user_id)}

