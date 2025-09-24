from pydantic import BaseModel, EmailStr, validator
import re

class UserBase(BaseModel):
    name: str
    age: int 
    username:str
    
    
class UserCreate(UserBase):
    email: EmailStr
    password: str
    @validator('email')
    def email_regex(cls, v):
        if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", v):
            raise ValueError('Email inválido')
        return v

    @validator('password')
    def password_regex(cls, v):
        if not re.match(r'^(?=.*[A-Z])(?=.*\d).{8,}$', v):
            raise ValueError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número')
        return v

class UserRead(UserBase):
    email: EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserLogged(UserBase):
    email: EmailStr
    password: str
    
class UserDeleteRequest(BaseModel):
    password: str