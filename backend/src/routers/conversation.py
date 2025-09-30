from fastapi import APIRouter, HTTPException, status, Depends
from models import UserModel, ConversationModel
from schemas import UserConversation
from sqlalchemy import and_
from sqlalchemy.orm import Session
from config import get_db
from security import get_current_user
 

root = APIRouter(prefix='/Conversation', tags=['Conversation'])

def search_conversation(current_user: UserModel, user_2: UserConversation, db:Session):
    return db.query(ConversationModel).filter(
        ((ConversationModel.first_user_id == current_user.id) &
        (ConversationModel.second_user_id == user_2.id))
        |((ConversationModel.first_user_id == user_2.id)  &
        (ConversationModel.second_user_id == current_user.id))
    ).first()

@root.post('/')
def create_conversation(second_user: UserConversation, current_user:UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        user = db.query(UserModel).filter(UserModel.id == second_user.id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials x'
            )
            
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials y'
            )
        
        conversation = search_conversation(current_user, user, db)
        
        if conversation:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='The conversation already exist'
            )
        
        new_conversation = ConversationModel(
            first_user_id = current_user.id,
            second_user_id = user.id
        )
        
        db.add(new_conversation)
        db.commit()
        return '200 ok'
    except ValueError as error:
        print(error)

@root.get('/')
def get_conversation(second_user:UserConversation, current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    try:
        user = db.query(UserModel).filter(UserModel.id == second_user.id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='The user not exist'
            )
        
        conversation = search_conversation(current_user, user, db)
        
        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='The conversation not exist'
            )
        
        return conversation

    except ValueError as error:
        print(error)

@root.delete('/')
def delete_conversation(user:UserConversation, current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    try:
        conversation = search_conversation(current_user, user, db)
        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='The conversation not exist'
            )
        db.delete(conversation)
        db.commit()
        return 'Conversation delete'
    except ValueError as error:
        print(error)