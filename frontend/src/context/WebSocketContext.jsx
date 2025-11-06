import { createContext, useContext, useEffect, useState } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const { currentUser } = useGetCurrentUser();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      socket?.close();
      setSocket(null);
      return;
    }

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/user/${currentUser.id}?token=${token}`);

    ws.onopen = () => console.log("✅ WS user connected");
    ws.onclose = () => console.log("❌ WS user closed");
    ws.onerror = (e) => console.error("⚠️ WS Error:", e);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WS message:", data);

      window.dispatchEvent(new CustomEvent("new-message", { detail: data }));
    };

    setSocket(ws);

    return () => ws.close();
  }, [currentUser]);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => useContext(WebSocketContext);
