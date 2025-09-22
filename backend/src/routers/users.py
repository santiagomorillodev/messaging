from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas import UserCreate, UserRead
from models import UserModel
from utils import get_user_email, get_by_username
from config import get_db


root = APIRouter(prefix='/Users', tags=['Users'])

@root.post('/')
def create_user(user:UserCreate, db: Session = Depends(get_db)):
    try:
        user_db = get_user_email(db, user.email)
        if user_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={'message', 'The email is already in use'}
            )
        
        new_user = UserModel(
            name = user.name,
            age = user.age,
            email = user.email,
            username = user.username,
            password = user.password
        )
        print('x')
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {'message': 'User Created'}
    except ValueError as e:
        print(e)
        
@root.get('/', response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()
    return users

@root.get('/')
def get_user_by_username(username:str, db:Session = Depends(get_db)):
    return get_by_username(db, username)


'''
    {
    "name": "string",
    "age": 18,
    "username": "string",
    "email": "user@example.com",
    "password": "Santiago1"
    }
'''