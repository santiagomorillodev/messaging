import { WebSocketProvider } from "../context/WebSocketContext";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <WebSocketProvider>
      <Outlet />
    </WebSocketProvider>
  );
}
