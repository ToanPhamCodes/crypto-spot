from db import db
from models.cards import Card
from models.user import User

def populateJohn():
    # Create a user
    user = User(firstName="John", lastName="Doe", email="johndoe@example.com", phoneNumber="1234567890", password="password")

    # Create two credit cards
    card1 = Card(name="Card 1", cardNumber="1111111111111111", expiryDate="12/2025", cvv=123, firstName="John", lastName="Doe")
    card2 = Card(name="Card 2", cardNumber="2222222222222222", expiryDate="05/2024", cvv=123, firstName="John", lastName="Doe")

    # Add the cards to the user's account
    user.addCard(card1)
    user.addCard(card2)

    # Deposit funds from the cards
    user.depositCash("1111111111111111", 50000)
    user.depositCash("2222222222222222", 50000)

    # Buy bitcoin with the funds
    user.buyCrypto("bitcoin", 0.1)

    db.users.insert_one(user.dict())
    db.cards.insert_one(card1.dict())
    db.cards.insert_one(card2.dict())

    print("Inserted John Doe")

def populateJane():
    # Create a user
    user = User(firstName="Jane", lastName="Doe", email="janedoe@example.com", phoneNumber="1234567890", password="password")

    # Create two credit cards
    card1 = Card(name="Card 1", cardNumber="3333333333333333", expiryDate="12/2025", cvv=123, firstName="Jane", lastName="Doe")
    card2 = Card(name="Card 2", cardNumber="4444444444444444", expiryDate="05/2024", cvv=123, firstName="Jane", lastName="Doe")
    card3 = Card(name="Card 3", cardNumber="5555555555555555", expiryDate="05/2024", cvv=123, firstName="Jane", lastName="Doe")

    # Add the cards to the user's account
    user.addCard(card1)
    user.addCard(card2)

    # Deposit funds from the cards
    user.depositCash("3333333333333333", 50000)
    user.depositCash("4444444444444444", 50000)

    # Buy bitcoin with the funds
    user.buyCrypto("bitcoin", 0.1)

    db.users.insert_one(user.dict())
    db.cards.insert_one(card1.dict())
    db.cards.insert_one(card2.dict())

    print("Inserted Jane Doe")