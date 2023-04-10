from typing import List
from pydantic import BaseModel

class Cryptocurrency(BaseModel):
    name: str
    symbol: str
    current_price: float
    high_24h: float
    low_24h: float
    last_updated: str