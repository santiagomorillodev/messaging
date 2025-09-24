from fastapi import APIRouter, HTTPException, status, Depends
from models import MessageModel, UserModel
from schemas import MessageDelete, MessageCreate, MessageRead, MessageUpdate
from sqlalchemy.orm import Session
from config import get_db
from security import get_current_user


root = APIRouter(tags=['Messages'])



@root.post('/conversation')
def create_conversation(message: MessageCreate, current_user:UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        conversation = db.query(MessageModel).filter(MessageModel.conversation_id == message.conversation_id).first()
        
        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
            
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
        
        db.add(message)
        db.commit()
        return message
    except ValueError as error:
        print(error)
        
        
@root.post('/')
def create_message(message: MessageCreate, current_user:UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        conversation = db.query(MessageModel).filter(MessageModel.conversation_id == message.conversation_id).first()
        
        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
            
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
        
        db.add(message)
        db.commit()
        return message
    except ValueError as error:
        print(error)
