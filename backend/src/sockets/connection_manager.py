# sockets.py
from typing import Dict, List
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        # 🔹 Guarda las conexiones activas: { user_id: [websocket1, websocket2, ...] }
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)
        print(f"🟢 Usuario {user_id} conectado. Total conexiones: {len(self.active_connections[user_id])}")

    def disconnect(self, user_id: int, websocket: WebSocket):
        if user_id in self.active_connections:
            if websocket in self.active_connections[user_id]:
                self.active_connections[user_id].remove(websocket)
                print(f"🔴 Usuario {user_id} desconectado (1 socket cerrado).")
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]
                print(f"⚫ Usuario {user_id} sin conexiones activas, eliminado del manager.")

    async def send_personal_message(self, message: dict, user_id: int):
        """Envía un mensaje a todos los sockets del usuario."""
        connections = self.active_connections.get(user_id, [])
        for ws in connections:
            try:
                await ws.send_json(message)
            except Exception as e:
                print(f"⚠️ Error enviando mensaje a {user_id}: {e}")
