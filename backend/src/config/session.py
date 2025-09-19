from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .base import Base

URL = 'mysql+pymysql://root:admin@localhost:3306/messaging_db'
engine = create_engine(URL, pool_pre_ping=True, echo=False)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)