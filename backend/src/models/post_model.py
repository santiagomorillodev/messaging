from config import Base
from sqlalchemy import Column, Text, Integer, ForeignKey, func, DateTime
from sqlalchemy.orm import relationship

class PostModel(Base):
    __tablename__ = 'Post'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('Users.id', ondelete='CASCADE'), nullable=False)
    public_id = Column(Text)
    url = Column(Text)
    content = Column(Text, nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship('UserModel', back_populates='posts')
    likes = relationship("LikeModel", back_populates="post", cascade="all, delete-orphan", passive_deletes=True)
