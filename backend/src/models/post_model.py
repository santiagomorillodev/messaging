from config import Base
from sqlalchemy import Column, Text, Integer, ForeignKey, func, DateTime
from sqlalchemy.orm import relationship

class PostModel(Base):
    __tablename__ = 'Post'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('Users.id'), nullable=False)
    public_id = Column(Text, nullable=True)
    url = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Posts(id={self.id}, id_user={self.id_user}, public_id={self.public_id}, url='{self.url}, content='{self.content}, created='{self.created}')>"

    user = relationship('UserModel', back_populates='posts')
    likes = relationship("LikeModel", back_populates="post", cascade="all, delete")
