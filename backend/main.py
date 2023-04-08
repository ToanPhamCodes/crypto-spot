from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from models import SignInData, SignUpData
from fastapi.middleware.cors import CORSMiddleware
from Auth import sign_up, sign_in
from User import User

app = FastAPI()
security = HTTPBasic()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.post("/signup")
# async def handle_sign_up(credentials: HTTPBasicCredentials = Depends(security)):
#     user = User(
#         first_name="",
#         last_name="",
#         email=credentials.username,
#         password=credentials.password
#     )
#     response = sign_up(user)
#     return response

# @app.post("/signin")
# async def handle_sign_in(credentials: HTTPBasicCredentials = Depends(security)):
#     response = sign_in(credentials.username, credentials.password)
#     if response:
#         return response
#     else:
#         raise HTTPException(status_code=401, detail="Invalid email or password")

@app.post("/signup")
async def handle_sign_up(data: SignUpData):
    user = User(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        password=data.password
    )
    response = sign_up(user)
    return response

@app.post("/signin")
async def handle_sign_in(data: SignInData):
    response = sign_in(data.email, data.password)
    if response:
        return response
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")