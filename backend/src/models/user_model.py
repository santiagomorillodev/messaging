from config import Base
from sqlalchemy import Column, Integer, DateTime, String, func, CheckConstraint
from sqlalchemy.orm import relationship

class UserModel(Base):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    age = Column(Integer, nullable=False)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        CheckConstraint('age >= 18', name='check_age'),
        CheckConstraint('length(name) >= 3', name='the name is very short'),
        CheckConstraint('length(password) >= 8', name='the password is very short')
    )

    conversation_first_user = relationship('ConversationModel', back_populates='first_user', foreign_keys='ConversationModel.first_user_id')
    conversation_second_user = relationship('ConversationModel', back_populates='second_user', foreign_keys='ConversationModel.second_user_id')
    messages = relationship('MessageModel', back_populates='sender')
    following = relationship('FollowerModel', foreign_keys='FollowerModel.follower_id', back_populates='follower')
    followers = relationship('FollowerModel', foreign_keys='FollowerModel.followed_id', back_populates='followed')