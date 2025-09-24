from pydantic import BaseModel
from datetime import datetime

class MessageBase(BaseModel):
    content: str
    conversation_id: int

class MessageCreate(MessageBase):
    pass

class MessageRead(MessageBase):
    created: datetime
    
class MessageUpdate(BaseModel):
    content: str
    id: int
    
class MessageDelete(BaseModel):
    password: str


