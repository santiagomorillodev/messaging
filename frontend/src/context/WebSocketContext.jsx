import { createContext, useContext, useEffect, useState } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const { currentUser } = useGetCurrentUser();
  const [socket, setSocket] = useState(null);

  console.log("WebSocketProvider renderizado, currentUser:", currentUser);

  useEffect(() => {
    if (!currentUser) {
      if (socket) socket.close();
      setSocket(null);
      return;
    }

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) return;

    // 🔹 Conexión global por usuario
    const ws = new WebSocket(`ws://localhost:8000/ws/user/${currentUser.id}?token=${token}`);

    ws.onopen = () => console.log("✅ WS conectado globalmente");
    ws.onclose = () => console.log("❌ WS cerrado");
    ws.onerror = (e) => console.error("⚠️ Error WS:", e);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Nuevo mensaje recibido:", data);

      // 🔹 Aquí puedes emitir un custom event para refrescar ChatSummary
      window.dispatchEvent(new CustomEvent("new-message", { detail: data }));
    };

    setSocket(ws);

    const handleUnload = () => ws.close();
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      ws.close();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [currentUser]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
