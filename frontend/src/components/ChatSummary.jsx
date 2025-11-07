import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useDesktopView } from "../context/DesktopViewContext";
import useGetUser from "../hooks/useGetUser.js";
import Error from "./Error";
import useGetLastMessage from "../hooks/useGetLastMessage";
import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext.jsx";
import { useFormatMessageTime } from "../hooks/useFormatMessageTime.js";

export const ChatSummary = ({ idUser, conversationId }) => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const socket = useWebSocket();

  const { user, loading: userLoading, error: userError } = useGetUser(idUser);
  const { lastMessage, loading: lastLoading, error: lastError } = useGetLastMessage(conversationId);

  const [message, setMessage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const time = useFormatMessageTime(message?.created);

  console.log(time)

  const loading = !loaded && (userLoading || lastLoading);
  const error = userError || lastError;

  // Guarda el último mensaje solo una vez cuando carga
  useEffect(() => {
    if (lastMessage && !loaded) {
      setMessage(lastMessage);
      setLoaded(true);
    }
  }, [lastMessage, loaded]);

  // ✅ ESCUCHA MENSAJES EN TIEMPO REAL SIN CONSULTAR API
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (event) => {
      const data = event.detail;
      if (data.conversation_id === conversationId) {
        setMessage({
          content: data.content,
          created: data.createdAt,
        });
      }
    };

    window.addEventListener("new-message", handleNewMessage);
    return () => window.removeEventListener("new-message", handleNewMessage);
  }, [socket, conversationId]);

  if (loading) return <div className="p-4 opacity-50">Cargando chat...</div>;
  if (error) return <Error error={error} />;

  if (!user) return null;

  const id = user.id;
  const name = user.name;
  const status = user.status;
  const photo = user.avatar_url;
  const chatId = conversationId;

  const handleClick = async () => {

    const response = await fetch(`http://localhost:8000/inbox/message/change-status/${chatId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.ok){
      const data  = await response.json();
      console.log(data);
    }

    if (isDesktop) {
      try {
        const { changeView } = useDesktopView();
        changeView("chat", { id, name, photo, chatId, status });
      } catch {}
    } else {
      navigate("/direct", { state: { id, name, photo, chatId, status } });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex gap-2 bg-first md:dark:bg-neutral-800 dark:text-white px-4 py-2 cursor-pointer"
    >
      <div className="flex relative">
        <img src={photo} alt="user" width="50" className="rounded-full min-w-[50px] h-[50px] object-cover" />
        <span className="absolute bottom-0 right-0">
          <i className={status ? "bx bxs-circle text-green-500" : "bx bxs-circle text-red-500"}></i>
        </span>
      </div>

      <div className="w-full p-1 overflow-hidden">
        <div className="w-full flex justify-between">
          <span className="font-bold text-sm">{name}</span>
          <span className="text-end text-sm">{time ?? "—"}</span>
        </div>
        <p className="truncate text-neutral-400 text-sm">
          {message?.content ?? ""}
        </p>
      </div>
    </div>
  );
};
