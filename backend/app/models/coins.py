from bson import ObjectId
from pydantic import BaseModel

class Coin(BaseModel):
  _id: ObjectId = ObjectId()
  # userId: int
  name: str
  amount: float = 0.0

  def addAmount(self, amount: float):
    self.amount += amount

  def removeAmount(self, amount: float):
    if self.amount < amount:
      raise ValueError("Insufficient coins")
    self.amount -= amount 

  def getAmount(self) -> float:
    return self.amount