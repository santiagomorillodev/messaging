from config import Base
from sqlalchemy import Column, Integer, DateTime, Text, func, CheckConstraint, ForeignKey
from sqlalchemy.orm import relationship
# from .user_conversation import user_conversation

class MessageModel(Base):
    __tablename__ = 'Messages'
    message_id = Column(Integer, primary_key=True, autoincrement=True)
    sender_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    conversation_id = Column(Integer, ForeignKey('Conversations.id'), nullable=True)
    content = Column(Text, nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        CheckConstraint('length(content) >= 1', name='the content is very short'),
    )

    conversation = relationship('ConversationModel', back_populates='messages')
    sender = relationship('UserModel', back_populates='messages')