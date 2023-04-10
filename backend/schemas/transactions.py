from typing import List
from pydantic import BaseModel

class Transaction(BaseModel):
    user_id: str
    cryptocurrency: str
    transaction_type: str
    amount: float
    price: float
    date: str
    time: str