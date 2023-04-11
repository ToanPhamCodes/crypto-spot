from bson import ObjectId
from pydantic import BaseModel, constr

class Card(BaseModel):
  _id: ObjectId = ObjectId()
  # userId: int
  cardNumber: str #constr(max_length=16, min_length=16)
  expiryDate: str #constr(regex=r'^(0[1-9]|1[0-2])\/([0-9]{4})$')
  cvv: str #constr(max_length=4, min_length=3)
  firstName: str
  lastName: str
  balance: float = 1000000.0

  def deposit(self, amount: float):
    self.balance += amount

  def withdraw(self, amount: float):
    if self.balance < amount:
      raise ValueError("Card has insufficient funds")
    self.balance -= amount

  def getBalance(self):
    return self.balance