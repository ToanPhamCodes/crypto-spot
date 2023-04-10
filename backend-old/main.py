from fastapi import FastAPI, HTTPException, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from Auth import sign_up, sign_in, sign_out
from User import UserAccount
from pydantic import BaseModel
import httpx

from models.cryptocurrencies import Cryptocurrency
from models.auth import SignUpData, SignInData

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
    user = UserAccount(
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


async def get_cryptocurrency(symbol: str) -> Cryptocurrency:
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

@app.post("/buy-cryptocurrency")
async def handle_buy_cryptocurrency(user_id: str, cryptocurrency: Cryptocurrency, amount: float):
    user = UserAccount.objects.get(email=user_id)
    response = user.buy_cryptocurrency(cryptocurrency, amount)
    return {"message": response}