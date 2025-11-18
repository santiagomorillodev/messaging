from typing import Dict, List
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, list[WebSocket]] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(user_id, []).append(websocket)

    def disconnect(self, user_id: int, websocket: WebSocket):
        if user_id in self.active_connections:
            if websocket in self.active_connections[user_id]:
                self.active_connections[user_id].remove(websocket)

            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    async def broadcast(self, message: dict):
        dead_connections = []

        for user_id, connections in self.active_connections.items():
            for conn in connections:
                try:
                    await conn.send_json(message)
                except RuntimeError:
                    dead_connections.append((user_id, conn))
                except Exception:
                    dead_connections.append((user_id, conn))

        # Remove dead sockets
        for user_id, conn in dead_connections:
            self.disconnect(user_id, conn)

    async def send_personal_message(self, message: dict, user_id: int):
        if user_id not in self.active_connections:
            return

        dead_connections = []

        for conn in self.active_connections[user_id]:
            try:
                await conn.send_json(message)
            except:
                dead_connections.append((user_id, conn))

        for user_id, conn in dead_connections:
            self.disconnect(user_id, conn)
