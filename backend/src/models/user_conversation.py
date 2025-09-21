from config import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

class ConversationUserModel(Base):
    __tablename__ = 'conversation_user'
    id = Column(Integer, ForeignKey('Conversations.id'), primary_key=True)
    sender = Column(Integer, ForeignKey('Users.id'), primary_key=True)
    
    conversation = relationship('ConversationModel', back_populates='users')
    user = relationship('UserModel', back_populates='conversations')