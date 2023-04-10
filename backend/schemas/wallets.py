from typing import List
from pydantic import BaseModel

class Wallet(BaseModel):
    user_id: str
    balance: float

    def deposit(self, amount: float):
        self.balance += amount

    def withdraw(self, amount: float):
        if amount > self.balance:
            raise ValueError("Insufficient balance")
        self.balance -= amount

    def get_balance(self) -> float:
        return self.balance