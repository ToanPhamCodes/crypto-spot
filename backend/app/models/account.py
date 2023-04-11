from .cards import Card
from .wallet import CryptoWallet, CashWallet
from bson import ObjectId
from pydantic import BaseModel
from typing import List

class Account(BaseModel):
  _id: ObjectId = ObjectId()
  # userId: ObjectId
  cashWallet: CashWallet = CashWallet()
  cryptoWallets: CryptoWallet = CryptoWallet()

  @property
  def balance(self):
    return self.cashBalance + self.cryptoBalance

  @property
  def cashBalance(self):
    return self.cashWallet.balance

  @property
  def cryptoBalance(self):
    return self.cryptoWallets.amount
  
  def buyCrypto(self, name: str, amount: float):
    # Check coin exists and get price
    # if coin does not exist raise coin not found
    currentPrice = 1.0
    cashValue = amount * currentPrice
    try:
      self.cashWallet.withdrawCash(cashValue)
      self.cryptoWallets.depositCoin(name, amount)
    except:
      raise ValueError("Insufficient funds")
    
  def sellCrypto(self, name: str, amount: float):
    # Check coin exists and get price
    # if coin does not exist raise coin not found
    currentPrice = 1.0
    cashValue = amount * currentPrice
    try:
      self.cryptoWallets.withdrawCoin(name, amount)
      self.cashWallet.depositCash(cashValue)
    except:
      raise ValueError("Insufficient coins")
    
  def getCrypto(self) -> dict:
    """Returns all coins and their balances"""
    try:
      return self.cryptoWallets.getCoins()
    except:
      return []
  
  def cardDeposit(self, cardNumber: str, amount: float):
    """Deposits cash to wallet"""
    try:
      self.cashWallet.cardDeposit(cardNumber, amount)
    except ValueError as e:
      raise ValueError(e)

  def cardWithdrawal(self, cardNumber: str, amount: float):
    """Withdraws cash from wallet"""
    try:
      self.cashWallet.cardWithdrawal(cardNumber, amount)
    except ValueError as e:
      raise ValueError(e)
  
  def addCard(self, card: Card):
    if len(self.cashWallet.cards) >= 5:
      raise ValueError("Maximum number of cards reached")
    self.cashWallet.addCard(card)

  def removeCard(self, cardNumber: str):
    try:
      self.cashWallet.removeCard(cardNumber)
    except ValueError as e:
      raise ValueError(e)
    
  def getCards(self):
    """Returns list of cards and balance in cash wallet"""
    try:
      return self.cashWallet.getCards()
    except:
      return []