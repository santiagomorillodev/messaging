from config import Base
from sqlalchemy import Column, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

class ConversationModel(Base):
    __tablename__ = 'Conversations'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    first_user_id = Column(Integer, ForeignKey('Users.id'),nullable=False)
    second_user_id = Column(Integer, ForeignKey('Users.id'),nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Conversation(id={self.id}, first={self.first_user_id}, second={self.second_user_id}, created='{self.created}')>"
    
    first_user = relationship('UserModel', back_populates='conversation_first_user', foreign_keys=[first_user_id])
    second_user = relationship('UserModel', back_populates='conversation_second_user', foreign_keys=[second_user_id])
    messages = relationship('MessageModel', back_populates='conversation', cascade='all, delete-orphan')