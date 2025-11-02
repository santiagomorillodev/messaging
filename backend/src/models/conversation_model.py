from config import Base
from sqlalchemy import Column, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

class ConversationModel(Base):
    __tablename__ = 'Conversations'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_user_id = Column(Integer, ForeignKey('Users.id', ondelete='CASCADE'), nullable=False)
    second_user_id = Column(Integer, ForeignKey('Users.id', ondelete='CASCADE'), nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())

    first_user = relationship('UserModel', foreign_keys=[first_user_id])
    second_user = relationship('UserModel', foreign_keys=[second_user_id])
    messages = relationship('MessageModel', back_populates='conversation', cascade="all, delete-orphan", passive_deletes=True)
