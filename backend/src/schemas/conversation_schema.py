from pydantic import BaseModel
from typing import Optional
import re

class ConversationBase(BaseModel):
    id: Optional[int] = None
    first_person: int
    second_person: int
    
class ConversationCreate(ConversationBase):
    pass

class ConversationRead(ConversationBase):
    pass

class ConversationRequest(BaseModel):
    id: int