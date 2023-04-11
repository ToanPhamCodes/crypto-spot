from db import db
from .cards import Card
from .coins import Coin
from bson import ObjectId
from pydantic import BaseModel
from typing import List

class CryptoWallet(BaseModel):
  _id: ObjectId = ObjectId()
  currencyType: str = "crypto"
  coins: List[Coin] = []

  @property
  def amount(self):
    if not self.coins:
      return 0.0
    return sum(coin.amount for coin in self.coins)

  def depositCoin(self, name: str, amount: float):
    """Deposits coin to wallet"""
    for coin in self.coins:
      if coin.name == name:
        coin.amount += amount
        return
    self.coins.append(Coin(name=name, amount=amount))

  def withdrawCoin(self, name: str, amount: float):
    """Withdraws coin from wallet and deletes coin if amount is 0"""
    for coin in self.coins:
      if coin.name == name:
        if coin.amount < amount:
          raise ValueError("Insufficient coins")
        coin.amount -= amount
        if coin.amount == 0.0:
          self.coins.remove(coin)
          db.coins.delete_one({"_id": coin._id})
        return
    raise ValueError("Coin not found")
  
  def getCoins(self) -> dict:
    """Returns a dictionary containing the name and amount of each coin"""
    coinInfo = []
    for coin in self.coins:
      coinInfo.append({
        "coin": coin.name,
        "balance": coin.amount
      })
    return coinInfo # type: ignore
  

class CashWallet(BaseModel):
  _id: ObjectId = ObjectId()
  currencyType: str = "cash"
  cards: List[Card] = []
  balance: float = 0.0

  @property
  def totalBalance(self):
    """Returns the total balance of the cash wallet"""
    if not self.cards:
      return 0.0
    return sum(card.balance for card in self.cards)
  
  def depositCash(self, amount: float):
    """Deposits cash to cash wallet"""
    self.balance += amount
  
  def withdrawCash(self, amount: float):
    """Withdraws cash from cash wallet"""
    if self.balance < amount:
      raise ValueError("Insufficient funds")
    self.balance -= amount

  def cardWithdrawal(self, cardNumber: str, amount: float):
    """Withdraw cash from wallet to card"""
    for card in self.cards:
      if card.cardNumber == cardNumber:
        if self.balance < amount:
          raise ValueError("Insufficient funds")
        self.withdrawCash(amount)
        card.deposit(amount)
        return
    raise ValueError(f"Card not found")

  def cardDeposit(self, cardNumber: str, amount: float):
    """Deposit cash to wallet from card"""
    for card in self.cards:
      if card.cardNumber == cardNumber:
        if amount > card.balance:
          raise ValueError("Insufficient funds")
        card.withdraw(amount)
        self.depositCash(amount)
        return
    raise ValueError(f"Card not found")

  def addCard(self, card: Card):
    """Adds card to cash wallet"""
    self.cards.append(card)

  def removeCard(self, cardNumber: str):
    """Removes card from cash wallet"""
    for card in self.cards:
      if card.cardNumber == cardNumber:
        self.cards.remove(card)
        db.cards.delete_one({"_id": card._id})
        return
    raise ValueError("Card not found")
  
  def getCards(self):
    """Returns all cards and their balances in the cash wallet"""
    cardInfo = []
    for card in self.cards:
      cardInfo.append({
        "cardNumber": card.cardNumber,
        "balance": card.balance
      })
    return cardInfo