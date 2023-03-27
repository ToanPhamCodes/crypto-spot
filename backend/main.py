from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Auth import sign_up, sign_in

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SignUpData(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str

class SignInData(BaseModel):
    email: str
    password: str

@app.post("/signup")
async def handle_sign_up(data: SignUpData):
    response = sign_up(data.email, data.password, data.first_name, data.last_name)
    return response

@app.post("/signin")
async def handle_sign_in(data: SignInData):
    response = sign_in(data.email, data.password)
    if response["success"]:
        return response
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

