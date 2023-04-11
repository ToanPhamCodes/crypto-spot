from fastapi import APIRouter, HTTPException, status
from bson.objectid import ObjectId
from db import db
from models.user import User

app = APIRouter()
