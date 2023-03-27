from User import User

class Registry:
    def __init__(self):
        self.users = []

    def add_user(self, user: User):
        self.users.append(user)

    def get_user(self, email, password):
        for user in self.users:
            if user.email == email and user.password == password:
                return user
        return None

