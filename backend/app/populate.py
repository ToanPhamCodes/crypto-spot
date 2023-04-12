from db import db
from models.cards import Card
from models.user import User

def populateUser(firstName: str, lastName: str, email: str, password: str):
    # Create a user
    user = User(firstName=firstName, lastName=lastName, email=email, password=password)

    # Create two credit cards
    card1 = Card(cardNumber="1111111111111111", expiryDate="12/2025", cvv=123, firstName=firstName, lastName=lastName)
    card2 = Card(cardNumber="2222222222222222", expiryDate="05/2024", cvv=123, firstName=firstName, lastName=lastName)

    # Add the cards to the user's account
    user.addCard(card1)
    user.addCard(card2)

    # Deposit funds from the cards
    user.depositCash("1111111111111111", 100000)
    user.depositCash("2222222222222222", 100000)

    # Buy bitcoin with the funds
    user.buyCrypto("bitcoin", 2, 10000)

    db.users.insert_one(user.dict())
    db.cards.insert_one(card1.dict())
    db.cards.insert_one(card2.dict())

    print(f"Inserted {firstName} {lastName}")

def populateJohn():
  populateUser("John", "Doe", "johndoe@example.com", "password")

# Populate Jane
def populateJane():
  populateUser("Jane", "Doe", "janedoe@example.com", "password")