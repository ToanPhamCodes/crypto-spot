from pydantic import BaseModel

class SignUpData(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str

class SignInData(BaseModel):
    email: str
    password: str
