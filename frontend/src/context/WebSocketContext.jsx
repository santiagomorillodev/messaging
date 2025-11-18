import { createContext, useContext, useEffect, useRef, useState } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { currentUser } = useGetCurrentUser();
  const [socket, setSocket] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/user/${currentUser.id}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("🟢 WebSocket conectado");
    ws.onclose = () => console.log("🔴 WebSocket cerrado");
    ws.onerror = (err) => console.error("❌ WS error:", err);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Mensaje recibido (context):", data);
        console.log('hola')

        window.dispatchEvent(new CustomEvent("new-message", { detail: data }));
      } catch (e) {
        console.error("Error parseando mensaje:", e);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [currentUser?.id]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
