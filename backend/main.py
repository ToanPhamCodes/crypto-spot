# from fastapi import FastAPI, HTTPException, Depends
# from fastapi.security import HTTPBasic, HTTPBasicCredentials
# from models import SignInData, SignUpData
# from fastapi.middleware.cors import CORSMiddleware
# from Auth import sign_up, sign_in
# from User import User

# app = FastAPI()
# security = HTTPBasic()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # @app.post("/signup")
# # async def handle_sign_up(credentials: HTTPBasicCredentials = Depends(security)):
# #     user = User(
# #         first_name="",
# #         last_name="",
# #         email=credentials.username,
# #         password=credentials.password
# #     )
# #     response = sign_up(user)
# #     return response

# # @app.post("/signin")
# # async def handle_sign_in(credentials: HTTPBasicCredentials = Depends(security)):
# #     response = sign_in(credentials.username, credentials.password)
# #     if response:
# #         return response
# #     else:
# #         raise HTTPException(status_code=401, detail="Invalid email or password")

# @app.post("/signup")
# async def handle_sign_up(data: SignUpData):
#     user = User(
#         first_name=data.first_name,
#         last_name=data.last_name,
#         email=data.email,
#         password=data.password
#     )
#     response = sign_up(user)
#     return response

# @app.post("/signin")
# async def handle_sign_in(data: SignInData):
#     response = sign_in(data.email, data.password)
#     if response:
#         return response
#     else:
#         raise HTTPException(status_code=401, detail="Invalid email or password")


from fastapi import FastAPI, HTTPException, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from models import SignInData, SignUpData
from Auth import sign_up, sign_in, sign_out
from User import User


from pydantic import BaseModel
import httpx

from schemas.cryptocurrencies import Cryptocurrency


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="your_secret_key")

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
async def handle_sign_in(data: SignInData, request: Request):
    response = sign_in(data.email, data.password)
    if response:
        request.session["user_id"] = response["user_id"]
        return response
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

@app.post("/logout")
async def handle_sign_out(request: Request):
    sign_out(request)
    return {"detail": "Successfully logged out"}





@app.get("/cryptocurrency/{symbol}", response_model=Cryptocurrency)
async def get_cryptocurrency(symbol: str):
    url = f"https://api.coingecko.com/api/v3/coins/{symbol}"
    response = httpx.get(url)
    response.raise_for_status()

    data = response.json()
    cryptocurrency = Cryptocurrency(
        name=data["name"],
        symbol=data["symbol"].upper(),
        current_price=data["market_data"]["current_price"]["usd"],
        high_24h=data["market_data"]["high_24h"]["usd"],
        low_24h=data["market_data"]["low_24h"]["usd"],
        last_updated=data["last_updated"]
    )
    return cryptocurrency