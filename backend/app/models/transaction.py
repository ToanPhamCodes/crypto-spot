from datetime import datetime
from pydantic import BaseModel

class Transaction(BaseModel):
    accountId: str
    transactionType: str
    currencyType: str
    amount: float
    fee: float
    timestamp: datetime