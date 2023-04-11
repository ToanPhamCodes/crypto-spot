from fastapi import APIRouter, HTTPException, status
from fastapi import Body
from bson.objectid import ObjectId
from db import db
from models.user import User
from typing import Dict, Optional, Union

app = APIRouter()

#Get a list of all users
@app.get("/users", response_model=list[User])
async def get_users():
    users = db.users.find({})
    return list(users)

#Get a specific user by id
@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
  user = db.users.find_one({"_id": ObjectId(user_id)})
  if not user:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  return user

#Get user by email
@app.get("/users/by-email", response_model=User)
async def get_user_by_email(email: str):
    user = db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

#Create a new user
@app.post("/user", response_model=User)
async def create_user(user: User = Body(...)):
  user_id = db.users.insert_one(user.dict()).inserted_id
  user = db.users.find_one({"_id": user_id}) # type: ignore
  return User(**user)

#Update a user - NOT WORKING
@app.put("/user/{user_id}", response_model=User)
async def update_user(
  user_id: str,
  first_name: Optional[str] = None,
  last_name: Optional[str] = None,
  phone_number: Optional[str] = None,
  email: Optional[str] = None,
  password: Optional[str] = None
  ):
  user = db.users.find_one({"_id": ObjectId(user_id)})
  if not user:
    raise HTTPException(status_code=404, detail="User not found")

  # Update the user fields that are specified in the request body
  update_fields = {}
  print(f"first_name: {first_name}")
  print(f"last_name: {last_name}")
  print(f"phone_number: {phone_number}")
  print(f"email: {email}")
  print(f"password: {password}")

  if first_name:
    update_fields["firstName"] = first_name
  if last_name:
    update_fields["lastName"] = last_name
  if phone_number:
    update_fields["phoneNumber"] = phone_number
  if email:
    # Check if the new email already exists in the database
    if db.users.find_one({"email": email}):
      raise HTTPException(status_code=400, detail="Email already exists")
    update_fields["email"] = email
  if password is not None:
    update_fields["password"] = password

  print(f"Fields: {update_fields}")
  # Update the user in the database
  db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
  # Return the updated user
  updated_user = db.users.find_one({"_id": ObjectId(user_id)})
  return User(**updated_user)


#Delete a user
@app.delete("/user/{user_id}")
async def delete_user(user_id: str):
  user = db.users.find_one({"_id": ObjectId(user_id)})
  if not user:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  db.users.delete_one({"_id": ObjectId(user_id)})
  return "User deleted"

#Deposit money into a user's account
@app.post("/user/{user_id}/deposit")
async def deposit(user_id: str, deposit_data: Dict[str, Union[str, float]]):
  user_doc = db.users.find_one({"_id": ObjectId(user_id)})
  if not user_doc:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

  # Create an instance of the User model from the document
  user = User.parse_obj(user_doc)

  try:
    user.depositCash(deposit_data['cardNumber'], float(deposit_data['amount']))
  except ValueError as e:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

  # Update the user document in the database
  db.users.replace_one({"_id": ObjectId(user_id)}, user.dict())

  return "Deposit successful"


#Withdraw money from a user's account
@app.post("/user/{user_id}/withdraw")
async def withdraw(user_id: str, withdraw_data: Dict[str, Union[str, float]]):
  user_doc = db.users.find_one({"_id": ObjectId(user_id)})
  if not user_doc:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

  # Create an instance of the User model from the document
  user = User.parse_obj(user_doc)

  try:
    user.withdrawCash(withdraw_data['cardNumber'], float(withdraw_data['amount']))
  except ValueError as e:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

  # Update the user document in the database
  db.users.replace_one({"_id": ObjectId(user_id)}, user.dict())

  return "Withdrawal successful"


#Buy a cryptocurrency
@app.post("/user/{user_id}/buy")
async def buy_crypto(user_id: str, request_body: dict):
    user_doc = db.users.find_one({"_id": ObjectId(user_id)})
    if not user_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Create an instance of the User model from the document
    user = User.parse_obj(user_doc)

    try:
        user.buyCrypto(request_body['symbol'], request_body['amount'], request_body['price'])
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    # Update the user document in the database
    db.users.replace_one({"_id": ObjectId(user_id)}, user.dict())

    return "Transaction successful"

#Sell a cryptocurrency
@app.post("/user/{user_id}/sell")
async def sell_crypto(user_id: str, request_body: dict):
    user_doc = db.users.find_one({"_id": ObjectId(user_id)})
    if not user_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Create an instance of the User model from the document
    user = User.parse_obj(user_doc)

    try:
        user.sellCrypto(request_body['symbol'], request_body['amount'], request_body['price'])
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    # Update the user document in the database
    db.users.replace_one({"_id": ObjectId(user_id)}, user.dict())

    return "Transaction successful"