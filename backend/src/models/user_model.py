from config import Base
from sqlalchemy import Column, Integer, DateTime, String, func
from sqlalchemy.orm import relationship
from .user_group import user_group

class UserModel(Base):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    username = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())

    groups = relationship('GroupModel', secondary=user_group, back_populates='members')