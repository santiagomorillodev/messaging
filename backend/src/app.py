from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from config import init_db
from config import get_db
from models import UserModel

init_db()
app = FastAPI()

@app.get('/')
def get_users(db:Session = Depends(get_db)):
    return db.query(UserModel).all()
