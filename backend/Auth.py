# from pymongo import MongoClient
# from fastapi import HTTPException
# from User import User

# client = MongoClient("mongodb+srv://phamtony1911:123@databasetest.090hg24.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true")
# db = client.SWE
# users_collection = db.users

# def get_password_hash(password):
#     return password

# def sign_up(user: User):
#     email = user.email.lower()

#     if users_collection.find_one({"email": email}):
#         raise HTTPException(status_code=400, detail="User already exists")

#     hashed_password = get_password_hash(user.password)
#     user_data = {
#         "first_name": user.first_name,
#         "last_name": user.last_name,
#         "email": email,
#         "hashed_password": hashed_password
#     }
#     user_id = users_collection.insert_one(user_data).inserted_id
#     return {"user_id": str(user_id)}

# def sign_in(email: str, password: str):
#     email = email.lower()

#     user = users_collection.find_one({"email": email})
#     if not user:
#         raise HTTPException(status_code=401, detail="User not found")

#     hashed_password = get_password_hash(password)
#     if user["hashed_password"] != hashed_password:
#         raise HTTPException(status_code=401, detail="Incorrect password")

#     return {"user_id": str(user["_id"]), "email": user["email"]}


from pymongo import MongoClient
from fastapi import HTTPException
from User import User

client = MongoClient("mongodb+srv://phamtony1911:123@databasetest.090hg24.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true")
db = client.SWE
users_collection = db.users

def get_password_hash(password):
    return password

def sign_up(user: User):
    email = user.email.lower()

    if users_collection.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = get_password_hash(user.password)
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": email,
        "hashed_password": hashed_password
    }
    user_id = users_collection.insert_one(user_data).inserted_id
    return {"user_id": str(user_id)}

def sign_in(email: str, password: str):
    email = email.lower()

    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    hashed_password = get_password_hash(password)
    if user["hashed_password"] != hashed_password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {"user_id": str(user["_id"]), "email": user["email"]}

def sign_out(request):
    request.session.pop("user_id", None)

