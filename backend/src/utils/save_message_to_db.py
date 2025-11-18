from models import MessageModel
from datetime import datetime
from sqlalchemy.orm import Session

async def save_message_to_db(
    sender_id: int,
    conversation_id: int,
    content: str,
    image_url: str,
    public_id: str,
    database: Session
):
    new_msg = MessageModel(
        sender_id=sender_id,
        conversation_id=conversation_id,
        content=content,
        image_url=image_url,
        public_id=public_id,
        created=datetime.utcnow(),
    )

    database.add(new_msg)
    database.commit()
    database.refresh(new_msg)
    database.close()
    return new_msg
