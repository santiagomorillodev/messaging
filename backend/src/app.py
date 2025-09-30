from fastapi import FastAPI
from config import init_db
from routers import user, conversations

init_db()
app = FastAPI()
app.include_router(user)
app.include_router(conversations)

@app.get('/')
def root():
    return {'message': 'Api running'}
