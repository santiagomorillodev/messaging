from fastapi import APIRouter, HTTPException, status, Depends, WebSocket, WebSocketDisconnect
from models import UserModel, ConversationModel, MessageModel
from schemas import UserConversation
from sqlalchemy import or_, desc
from sqlalchemy.orm import Session
from config import get_db
from security import get_current_user
 

root = APIRouter(prefix='/conversation', tags=['Conversation'])

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
                detail='Invalid credentials'
            )
            
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
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
        result = []
        if  conversation:
            for conv in conversation:
            # Determinar quién es el "otro" usuario
                other_user = (
                    conv.second_user if conv.first_user_id == current_user.id else conv.first_user
                )
                result.append({
                    "conversation_id": conv.id,
                    "name": other_user.username,
                    "photo": other_user.photo_url,
                    "last_message": conv.last_message.content if conv.last_message else "",
                })
        
        return result

    except ValueError as error:
        print(error)
        

@root.get('/all')
def get_all_conversation(current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    try:
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
        conversations = db.query(ConversationModel).filter(
        or_(
            ConversationModel.first_user_id == current_user.id,
            ConversationModel.second_user_id == current_user.id
        )
        ).all()      
        if not conversations:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Conversations not found'
            )
        
        return conversations

    except ValueError as error:
        print(error)
        
@root.get('/{id}/last-message')
def get_last_message(id:int, db: Session = Depends(get_db)):
    try:
        return db.query(MessageModel).filter(MessageModel.conversation_id == id).order_by(MessageModel.created.desc()).first()
    except ValueError as e:
        print(e)

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