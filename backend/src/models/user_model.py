from config import Base
from sqlalchemy import Column, Integer, DateTime, String, func, CheckConstraint, Boolean
from sqlalchemy.orm import relationship

class UserModel(Base):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    age = Column(Integer, nullable=False)
    username = Column(String(50), nullable=False, unique=True)
    description = Column(String(100), nullable=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    avatar_url = Column(String(512), nullable=True)
    status = Column(Boolean, default=False)
    created = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint('age >= 18', name='check_age'),
        CheckConstraint('length(name) >= 3'),
        CheckConstraint('length(password) >= 8')
    )

    conversation_first_user = relationship(
        'ConversationModel',
        back_populates='first_user',
        foreign_keys='ConversationModel.first_user_id',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    conversation_second_user = relationship(
        'ConversationModel',
        back_populates='second_user',
        foreign_keys='ConversationModel.second_user_id',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    messages = relationship(
        'MessageModel',
        back_populates='sender',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    following = relationship(
        'FollowerModel',
        foreign_keys='FollowerModel.follower_id',
        back_populates='follower',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    followers = relationship(
        'FollowerModel',
        foreign_keys='FollowerModel.followed_id',
        back_populates='followed',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    recent_Search = relationship(
        'RecentModel',
        foreign_keys='RecentModel.user_id',
        back_populates='user',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    other = relationship(
        'RecentModel',
        foreign_keys='RecentModel.other_user',
        back_populates='second',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    posts = relationship(
        'PostModel',
        back_populates='user',
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    likes = relationship(
        "LikeModel",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
