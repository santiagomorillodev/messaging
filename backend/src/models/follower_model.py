from config import Base
from sqlalchemy import Column, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship

class FollowerModel(Base):
    __tablename__ = 'Followers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    follower_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    followed_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())

    follower = relationship('UserModel', foreign_keys=[follower_id], backref= 'following')
    followed = relationship('UserModel', foreign_keys=[followed_id],backref= 'followers')