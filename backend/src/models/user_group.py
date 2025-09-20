from config import Base
from sqlalchemy import Column, Integer, ForeignKey, Table, UniqueConstraint

user_group = Table(
    'User_Groups',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('Users.id'), primary_key=True),
    Column('group_id', Integer, ForeignKey('Groups.id'), primary_key=True)
    
)