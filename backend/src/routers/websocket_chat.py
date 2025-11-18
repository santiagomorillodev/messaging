from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException, status, Depends
from sqlalchemy.orm import Session
from models import MessageModel, ConversationModel, UserModel
from utils import save_message_to_db
from schemas import MessageCreate
from utils import upload_base64_to_cloudinary
from config import get_db
from security import get_current_user
from sockets import ConnectionManager
import base64
import uuid



router = APIRouter(prefix="/ws", tags=["WebSocket"])

manager = ConnectionManager()

async def save_base64_image(base64_string: str) -> str:
    header, encoded = base64_string.split(",", 1)
    file_data = base64.b64decode(encoded)
    
    filename = f"{uuid.uuid4()}.jpg"
    filepath = f"static/uploads/{filename}"

    with open(filepath, "wb") as f:
        f.write(file_data)

    # Devuelves URL accesible
    return f"/static/uploads/{filename}"


def create_message(message: MessageCreate, current_user:UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        user_in_conversation = db.query(ConversationModel).filter(((ConversationModel.first_user_id == current_user.id)| (ConversationModel.second_user_id == current_user.id))).first()

        if not user_in_conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="You don't belong in that conversation."
            )
        conversation = db.query(ConversationModel).filter(ConversationModel.id == message.conversation_id).first()

        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='The conversations not exist'
            )
            
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials'
            )
        
        new_message = MessageModel(
            sender_id = current_user.id,
            content = message.content,
            conversation_id=message.conversation_id
        )
        
        db.add(new_message)
        db.commit()
        return message
    except ValueError as error:
        print(error)
        

@router.websocket("/user/{user_id}")
async def user_socket(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await manager.connect(user_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()

            image_url = None
            public_id = None

            # 1. SUBIR IMAGEN A CLOUDINARY (si existe)
            if data.get("image_base64"):
                try:

                    upload_result = await upload_base64_to_cloudinary(
                        data["image_base64"]
                    )

                    image_url = upload_result["secure_url"]
                    public_id = upload_result["public_id"]

                except Exception as e:
                    await websocket.send_json({
                        "error": "Error uploading to Cloudinary",
                        "details": str(e)
                    })
                    continue

            # 2. GUARDAR EN BD (texto + imagen opcional)
            saved_message = await save_message_to_db(
                sender_id=data["sender_id"],
                conversation_id=data["conversation_id"],
                content=data.get("content"),
                image_url=image_url,
                public_id=public_id,
                database=db
            )

            # 3. BROADCAST
            message = {
                "type": "message",
                "sender_id": data["sender_id"],
                "conversation_id": data["conversation_id"],
                "content": saved_message.content,
                "image_url": saved_message.image_url,
                "public_id": saved_message.public_id,
                "created": saved_message.created.isoformat(),
            }

            await manager.broadcast(message)

            # 4. NOTIFICATIONS
            recipient_id = data.get("recipient_id")
            if recipient_id and recipient_id != data["sender_id"]:
                notification = {
                    "type": "notification",
                    "recipient_id": recipient_id,
                    "title": "Nuevo mensaje",
                    "body": f"Usuario {data['sender_id']} te ha enviado un mensaje.",
                    "conversation_id": data["conversation_id"],
                    "timestamp": saved_message.created.isoformat(),
                }
                await manager.send_personal_message(notification, recipient_id)

    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)

