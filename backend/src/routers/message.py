from fastapi import APIRouter, HTTPException, status, Depends
from models import MessageModel, UserModel, ConversationModel
from schemas import MessageDelete, MessageCreate, MessageRead, MessageRequest, MessageResponse, ConversationRequest
from sqlalchemy.orm import Session
from sqlalchemy import or_
from config import get_db
from security import get_current_user


root = APIRouter(prefix="/inbox", tags=['Messages'])
        
        
@root.post('/')
def create_message(message: MessageCreate, current_user:UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        user_in_conversation = db.query(ConversationModel).filter(((ConversationModel.first_user_id == current_user.id)| (ConversationModel.second_user_id == current_user.id))).first()

        if not user_in_conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="You don't belong in that conversation."
            )
        conversation = db.query(ConversationModel).filter(ConversationModel.id == message.conversation_id).first()

        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='The conversations not exist'
            )
            
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
        
        new_message = MessageModel(
            sender_id = current_user.id,
            content = message.content,
            conversation_id=message.conversation_id
        )
        
        db.add(new_message)
        db.commit()
        return message
    except ValueError as error:
        print(error)
        
@root.get('/chat/{id}', response_model=list[MessageResponse])
def get_messages(id: int, current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    try: 
        conversation_db = db.query(ConversationModel).filter(ConversationModel.id == id).first()
        if not conversation_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='The conversations not exist'
            )
        
        user = db.query(ConversationModel).filter(or_((ConversationModel.first_user_id == current_user.id), (ConversationModel.second_user_id == current_user.id))).all()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="You don't belong in that conversation."
            )
            
        print(id)
        
        messages = db.query(MessageModel).filter(MessageModel.conversation_id == id).all()
        
        print(messages)
        
        
        return messages
    except ValueError as error:
        print(error)
        
@root.delete('/')
def delete_message(message: MessageRequest, current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    try:
        message_db = db.query(MessageModel).filter(((MessageModel.message_id == message.id) & (MessageModel.sender_id == current_user.id))).first()
        if not message_db:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
        
        db.delete(message_db)
        db.commit()
        return 'Message Deleted'
    except ValueError as error:
        print(error)
        