from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from config import init_db
from routers import root as users
from routers import router as follows

init_db()
app = FastAPI()
app.include_router(users)
app.include_router(follows)

@app.get('/')
def root():
    return {'message': 'Api running'}
