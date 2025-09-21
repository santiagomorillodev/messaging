from sqlalchemy.orm import Session
from models import UserModel

def get_user_email(db:Session, email:str):
    return db.query(UserModel).filter(UserModel.email == email).first()