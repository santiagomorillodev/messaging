from config import Base
from sqlalchemy import Column, Text, Integer, ForeignKey, func, DateTime, Boolean
from sqlalchemy.orm import relationship

class MessageModel(Base):
    __tablename__ = 'Messages'
    message_id = Column(Integer, primary_key=True, autoincrement=True)
    sender_id = Column(Integer, ForeignKey('Users.id', ondelete='CASCADE'), nullable=False)
    conversation_id = Column(Integer, ForeignKey('Conversations.id', ondelete='CASCADE'), nullable=True)
    content = Column(Text, nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(Boolean, nullable=False, default=False)

    sender = relationship('UserModel', back_populates='messages')
    conversation = relationship('ConversationModel', back_populates='messages')
