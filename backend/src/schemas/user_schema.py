from pydantic import BaseModel, EmailStr, validator, ConfigDict
from typing import Optional
import re
from datetime import datetime

class UserBase(BaseModel):
    name: str
    age: int 
    username:str
    
    
class UserCreate(UserBase):
    email: EmailStr
    password: str
    avatar_url:Optional[str] = None
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
    id: int
    email: EmailStr
    avatar_url:Optional[str] = None
    description:Optional[str] = None
    status: bool
    created: datetime
    
    model_config = ConfigDict(from_attributes=True, extra="ignore")


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserLogged(UserBase):
    email: EmailStr
    password: str
    
class UserDeleteRequest(BaseModel):
    email: EmailStr
    password: str
    
class UserUpdate(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    description : Optional[str] = None

class UserConversation(BaseModel):
    id: int

class UserLikes(BaseModel):
   post_id : int

class UserPassword(BaseModel):
   current_password : str
   new_password: str
   
class UserEmail(BaseModel):
    current_password : str
    email : EmailStr