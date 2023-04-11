from models.cryptocurrencies import Cryptocurrency
from models.transactions import Transaction
from models.wallets import Wallet

class UserAccount:
    def __init__(self, first_name: str, last_name: str, email: str, password: str):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

        self.wallet = Wallet(user_id=self.email, balance=10000)
        self.wallet.save()

    def buy_cryptocurrency(self, cryptocurrency: Cryptocurrency, amount: float) -> str:
        symbol = cryptocurrency.symbol.lower()
        current_price = get_cryptocurrency(symbol).current_price

        total_cost = current_price * amount
        user_wallet = Wallet.objects.get(user_id=self.email)

        if user_wallet.balance < total_cost:
            return "Error: Insufficient funds"

        user_wallet.balance -= total_cost
        user_wallet.save()

        transaction = Transaction(
            user_id=self.email,
            cryptocurrency=cryptocurrency,
            amount=amount,
            price=current_price,
            transaction_type='buy'
        )
        transaction.save()

        return "Transaction successful"