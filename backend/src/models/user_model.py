from config import Base
from sqlalchemy import Column, Integer, DateTime, String, func, CheckConstraint
from sqlalchemy.orm import relationship, validates
from .user_group import user_group

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

    groups = relationship('GroupModel', secondary=user_group, back_populates='members')