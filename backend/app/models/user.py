from bson import ObjectId
from datetime import datetime
from pydantic import BaseModel, EmailStr
from .account import Account

class User(BaseModel):
  _id: ObjectId = ObjectId()
  firstName: str
  lastName: str
  email: str
  phoneNumber: str
  password: str
  account: Account = Account(userId=_id)

  # createdAt: datetime
  # updatedAt: datetime

  @property
  def totalBalance(self):
    return self.account.balance
  
  @property
  def cashBalance(self):
    return self.account.cashBalance
  
  @property
  def cryptoBalance(self):
    return self.account.cryptoBalance
  
  def getCards(self):
    return self.account.getCards()
  
  def getCrypto(self):
    return self.account.getCrypto()
  
  def buyCrypto(self, name: str, amount: float, price: float):
    try:
      self.account.buyCrypto(name, amount, price)
    except ValueError as e:
      raise ValueError(f"Error buying crypto: {str(e)}")

  def sellCrypto(self, name: str, amount: float, price: float):
    try:
      self.account.sellCrypto(name, amount, price)
    except ValueError as e:
      raise ValueError(f"Error selling crypto: {str(e)}")

  def depositCash(self, cardNumber: str, amount: float):
    """Deposits cash into account"""
    try:
      self.account.cardDeposit(cardNumber, amount)
    except ValueError as e:
      raise ValueError(f"Error depositing cash: {str(e)}")

  def withdrawCash(self, cardNumber: str, amount: float):
    """Withdraws cash from account"""
    try:
      self.account.cardWithdrawal(cardNumber, amount)
    except ValueError as e:
      raise ValueError(f"Error withdrawing cash: {str(e)}")

  def addCard(self, card):
    try:
      return self.account.addCard(card)
    except ValueError as e:
      raise ValueError(f"Error adding card: {str(e)}")

  def removeCard(self, cardNumber: str):
    try:
      return self.account.removeCard(cardNumber)
    except ValueError as e:
      raise ValueError(f"Error removing card: {str(e)}")