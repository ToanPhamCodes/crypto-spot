from models.cryptocurrencies import Cryptocurrency
from User import UserAccount

# Create a new user account
user = UserAccount(first_name="John", last_name="Doe", email="john.doe@example.com", password="password")

# Buy a cryptocurrency
cryptocurrency = Cryptocurrency(name="Bitcoin", symbol="BTC", current_price=60000.00, high_24h=62000.00, low_24h=58000.00, last_updated="2022-04-11T12:00:00.000Z")
result = user.buy_cryptocurrency(user_id=user.email, cryptocurrency=cryptocurrency, amount=0.1)

# Check that the transaction was successful
assert result == "Transaction successful"