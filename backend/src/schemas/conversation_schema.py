from pydantic import BaseModel, validator
from typing import Optional
import re

class ConversationBase(BaseModel):
    name: str
    description: Optional[int] = None
    
    @validator('name')
    def validate_name(cls, v):
        if len(v) < 1:
            raise ValueError('the name is very short')
    
class ConversationCreate(ConversationBase):
    pass

class ConversationRead(ConversationBase):
    pass