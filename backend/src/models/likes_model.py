from config import Base
from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

class LikeModel(Base):
    __tablename__ = 'Likes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    post_id = Column(Integer, ForeignKey('Images.id'), nullable=False)

    __table_args__ = (
        UniqueConstraint('user_id', 'post_id', name='unique_user_post_like'),
    )

    user = relationship("UserModel", back_populates="likes", foreign_keys=[user_id])
    post = relationship("ImageModel", back_populates="likes", foreign_keys=[post_id])
