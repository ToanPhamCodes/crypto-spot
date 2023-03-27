from User import User
from Registry import Registry

registry = Registry()

def sign_up(email, password, first_name, last_name):
    user = User(email, password, first_name, last_name)
    registry.add_user(user)
    return {"success": True, "message": "User registered"}

def sign_in(email, password):
    user = registry.get_user(email, password)
    if user:
        return {"success": True, "message": "User signed in", "user": user}
    else:
        return {"success": False, "message": "Invalid email or password"}

