from fastapi import FastAPI
from config import init_db
from routers import user, conversations, messages, images

init_db()
app = FastAPI()
app.include_router(user)
app.include_router(conversations)
app.include_router(messages)
app.include_router(images)

@app.get('/')
def root():
    return {'message': 'Api running'}
