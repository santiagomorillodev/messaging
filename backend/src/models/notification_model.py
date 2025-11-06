from config import Base
from sqlalchemy import Column, Integer, DateTime, func, ForeignKey, Text,Boolean
from sqlalchemy.orm import relationship

class NotificationModel(Base):
    __tablename__ = 'Notifications'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Users.id', ondelete='CASCADE'), nullable=False)
    other_user_id = Column(Integer, ForeignKey('Users.id', ondelete='CASCADE'), nullable=False)
    content = Column(Text, nullable=True)
    status = Column(Boolean, nullable=True, default=False)
    created = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship('UserModel', foreign_keys=[user_id], back_populates='notifications')
    other_user = relationship('UserModel', foreign_keys=[other_user_id], back_populates='notifications_from_others')
