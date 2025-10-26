from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_
from models import ConversationModel, UserModel, MessageModel
from config import get_db
from security import decode_access_token
from sockets import ConnectionManager

router = APIRouter(prefix="/ws", tags=["Chat WebSocket"])
manager = ConnectionManager()


from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from models import ConversationModel, UserModel, MessageModel
from config import get_db
from security import decode_access_token
from sockets import ConnectionManager
from datetime import datetime

router = APIRouter(prefix="/ws", tags=["Chat WebSocket"])
manager = ConnectionManager()

@router.websocket("/user/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    # ✅ Verificar token
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=4003)
        return

    payload = decode_access_token(token)
    if not payload or payload.get("id") != user_id:
        await websocket.close(code=4003)
        return

    # ✅ Verificar usuario en BD
    current_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not current_user:
        await websocket.close(code=4003)
        return

    # ✅ Conectar usuario
    await manager.connect(user_id, websocket)
    print(f"🔌 Usuario conectado: {current_user.username}")

    try:
        while True:
            try:
                data = await websocket.receive_json()
            except WebSocketDisconnect:
                print(f"⚠️ Cliente {user_id} desconectado correctamente.")
                break  # 👈 Rompe el bucle de forma limpia
            except Exception as e:
                print(f"⚠️ Error al recibir mensaje: {e}")
                db.rollback()
                continue

            # --- Procesamiento normal del mensaje ---
            conversation_id = data.get("conversation_id")
            content = data.get("content")

            if not conversation_id or not content:
                print("⚠️ Datos incompletos, se omite mensaje.")
                continue

            try:
                message = MessageModel(
                    sender_id=user_id,
                    content=content,
                    conversation_id=conversation_id
                )
                db.add(message)
                db.commit()
                db.refresh(message)
            except Exception as e:
                print(f"⚠️ Error al guardar mensaje: {e}")
                db.rollback()
                continue

            conversation = db.query(ConversationModel).filter(
                ConversationModel.id == conversation_id
            ).first()
            if not conversation:
                print("⚠️ Conversación no encontrada.")
                continue

            users_to_notify = [
                conversation.first_user_id,
                conversation.second_user_id
            ]

            for uid in users_to_notify:
                await manager.send_personal_message(
                    {
                        "conversation_id": conversation_id,
                        "content": content,
                        "sender_id": user_id,
                        "created_at": message.created.isoformat() if hasattr(message, "created") else None
                    },
                    uid
                )

    except WebSocketDisconnect:
        print(f"❌ Usuario {user_id} se desconectó (capturado fuera del bucle).")
        manager.disconnect(user_id, websocket)

