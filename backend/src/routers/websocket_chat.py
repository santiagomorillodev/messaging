from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_
from models import ConversationModel, UserModel, MessageModel
from config import get_db
from security import decode_access_token
from sockets import ConnectionManager

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
            # 🔹 Recibir mensaje del cliente (JSON)
            data = await websocket.receive_json()
            print(f'data = {data}')
            conversation_id = data.get("conversation_id")
            content = data.get("content")

            if not conversation_id or not content:
                continue

            # 🔹 Guardar mensaje
            message = MessageModel(
                sender_id=user_id,
                content=content,
                conversation_id=conversation_id
            )
            print(f'guardando mensaje: {message}')
            db.add(message)
            db.commit()

            # 🔹 Buscar conversación y sus usuarios
            conversation = db.query(ConversationModel).filter(ConversationModel.id == conversation_id).first()
            if not conversation:
                continue

            users_to_notify = [
                conversation.first_user_id,
                conversation.second_user_id
            ]

            # 🔹 Enviar el mensaje a todos los usuarios conectados en esa conversación
            for uid in users_to_notify:
                await manager.send_personal_message(
                    {
                        "conversation_id": conversation_id,
                        "content": content,
                        "sender_id": user_id,
                    },
                    uid
                )

    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)
        print(f"❌ Usuario desconectado: {current_user.username}")
