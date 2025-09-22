from sqlalchemy.orm import Session
from models import UserModel

def get_user_email(db:Session, email:str) -> UserModel:
    return db.query(UserModel).filter(UserModel.email == email).first()

def get_by_username(db:Session, username:str) -> UserModel:
    return db.query(UserModel).filter(UserModel.username == username).first()