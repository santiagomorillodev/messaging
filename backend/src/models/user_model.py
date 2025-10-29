from config import Base
from sqlalchemy import Column, Integer, DateTime, String, func, CheckConstraint, Text
from sqlalchemy.orm import relationship

class UserModel(Base):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    age = Column(Integer, nullable=False)
    username = Column(String(50), nullable=False, unique=True)
    description = Column(String(100), nullable=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    avatar_url = Column(String(512), nullable=True, default='https://res.cloudinary.com/dyteo3qdh/image/upload/v1760837715/usuario_yrdfvf.png')
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        CheckConstraint('age >= 18', name='check_age'),
        CheckConstraint('length(name) >= 3', name='the name is very short'),
        CheckConstraint('length(password) >= 8', name='the password is very short')
    )
    
    def __repr__(self):
        return f"<Message(id={self.id}, username={self.username}, name={self.name}, email='{self.email}')>"

    conversation_first_user = relationship('ConversationModel', back_populates='first_user', foreign_keys='ConversationModel.first_user_id')
    conversation_second_user = relationship('ConversationModel', back_populates='second_user', foreign_keys='ConversationModel.second_user_id')
    messages = relationship('MessageModel', back_populates='sender')
    following = relationship('FollowerModel', foreign_keys='FollowerModel.follower_id', back_populates='follower')
    followers = relationship('FollowerModel', foreign_keys='FollowerModel.followed_id', back_populates='followed')
    recent_Search = relationship('RecentModel', foreign_keys='RecentModel.user_id', back_populates='user')
    other = relationship('RecentModel', foreign_keys='RecentModel.other_user', back_populates='second')
    posts = relationship('PostModel', back_populates='user')
    likes = relationship("LikeModel", back_populates="user", cascade="all, delete")