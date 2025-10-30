from fastapi import FastAPI
from config import init_db
from routers import user, conversations, messages, posts, socket
from fastapi.middleware.cors import CORSMiddleware


init_db()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,                   # 🔑 necesario para cookies
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user)
app.include_router(conversations)
app.include_router(messages)
app.include_router(posts)
app.include_router(socket)

@app.get('/')
def root():
    return {'message': 'Api running'}
