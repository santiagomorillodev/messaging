from config import Base
from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.orm import relationship

class ConversationModel(Base):
    __tablename__ = 'Conversations'
    id = Column(Integer, nullable=False, primary_key=True)
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    users = relationship('ConversationUserModel', back_populates='conversation', cascade='all, delete-orphan')
    messages = relationship('MessageModel', back_populates='conversation', cascade='all, delete-orphan')