from config import Base
from sqlalchemy import Column, Integer, DateTime, String, func, CheckConstraint
from sqlalchemy.orm import relationship
from .user_group import user_group

class GroupModel(Base):
    __tablename__ = 'Groups'
    id = Column(Integer, nullable=False, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(String(300))
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        CheckConstraint('length(name) > 0', name='the field cannot be empty'),
        CheckConstraint('length(name) >= 3', name='the group name is very short'),
    )
    
    members = relationship('UserModel', secondary=user_group, back_populates='groups')