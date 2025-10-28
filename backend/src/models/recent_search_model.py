from config import Base
from sqlalchemy import Column, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

class RecentModel(Base):
    __tablename__ = 'recent'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    other_user = Column(Integer, ForeignKey('Users.id'), nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship(
        'UserModel',
        foreign_keys=[user_id],
        back_populates='recent_Search'
    )
    
    second = relationship(
        'UserModel',
        foreign_keys=[other_user],
        back_populates='other'
    )
    