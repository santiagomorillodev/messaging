from config import Base
from sqlalchemy import Column, Integer, DateTime, func, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

class FollowerModel(Base):
    __tablename__ = 'Followers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    follower_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    followed_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    __table_args__ = (
        UniqueConstraint('follower_id', 'followed_id', name='uix_user_group'),
    )

    follower = relationship(
        'UserModel',
        foreign_keys=[follower_id],
        back_populates='following'
    )
    # El usuario que es seguido
    followed = relationship(
        'UserModel',
        foreign_keys=[followed_id],
        back_populates='followers'
    )