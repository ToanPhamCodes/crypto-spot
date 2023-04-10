from models.cryptocurrencies import Cryptocurrency
from models.transactions import Transaction
from models.wallets import Wallet

class UserAccount:
  def __init__(self, first_name : str, last_name : str, email : str, password: str):
    self.first_name = first_name
    self.last_name = last_name
    self.email = email
    self.password = password
  

  def buy_cryptocurrency(user_id: str, cryptocurrency: Cryptocurrency, amount: float) -> str:
    # Get the current price of the cryptocurrency
    symbol = cryptocurrency.symbol.lower()
    current_price = get_cryptocurrency(symbol).current_price

    # Calculate the total cost of the transaction
    total_cost = current_price * amount

    # Retrieve the user's wallet
    user_wallet = Wallet.objects.get(user_id=user_id)

    # Check if the user has enough funds in their wallet
    if user_wallet.balance < total_cost:
        return "Error: Insufficient funds"

    # Deduct the total cost of the transaction from the user's wallet
    user_wallet.balance -= total_cost
    user_wallet.save()

    # Create a new transaction entry for the user
    transaction = Transaction(
        user_id=user_id,
        cryptocurrency=cryptocurrency,
        amount=amount,
        price=current_price,
        transaction_type='buy'
    )
    transaction.save()

    return "Transaction successful"