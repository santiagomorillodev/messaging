from config import Base
from sqlalchemy import Column, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship

class ImageModel(Base):
    __tablename__ = 'Images'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('Users.id'), nullable=False)
    url = Column(Text, nullable=False)

    user = relationship('UserModel', back_populates='images')
