from pydantic import BaseModel
from datetime import datetime

class MessageBase(BaseModel):
    content: str
    conversation_id: int

class MessageCreate(MessageBase):
    pass

class MessageRead(MessageBase):
    pass

class MessageResponse(BaseModel):
    message_id: int
    sender_id: int
    content: str
    status: bool
    created: datetime
    
class MessageRequest(BaseModel):
    id: int
    
class MessageDelete(BaseModel):
    password: str


