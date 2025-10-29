from sqlalchemy.orm import Session
from models import UserModel, LikeModel



def get_user_email(db:Session, email:str) -> UserModel:
    return db.query(UserModel).filter(UserModel.email == email).first()

def get_by_username(db:Session, username:str) -> UserModel:
    return db.query(UserModel).filter(UserModel.username == username).first()

def get_user_by_id (db:Session, id) -> UserModel:
    return db.query(UserModel).filter(UserModel.id == id).first()

def user_like (user:UserModel, post: LikeModel):
    likes = user.likes
    for like in likes:
        if like['id'] == post.id:
            return True
    
    return False