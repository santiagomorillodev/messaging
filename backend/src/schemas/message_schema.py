from pydantic import BaseModel

class MessageBase(BaseModel):
    content: str

class MessageCreate(MessageBase):
    pass

class MessageRead(MessageBase):
    pass

