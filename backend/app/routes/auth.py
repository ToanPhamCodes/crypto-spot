from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
from typing import Dict
from hashlib import sha256
from db import db
from models.user import User

app = FastAPI()

security = HTTPBasic()