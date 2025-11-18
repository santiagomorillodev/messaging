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
  const [menu, setMenu] = useState(false)
  const [visibility, setVisibility] = useState(true)
  const [isDelete, setIsDelete] = useState(false)
  const { user, loading: userLoading, error: userError } = useGetUser(idUser);
  const { lastMessage, loading: lastLoading, error: lastError } = useGetLastMessage(conversationId);
  console.log(user)
  const [message, setMessage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const time = useFormatMessageTime(message?.created);


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
  const statusText = status ? "En línea" : "Desconectado";
  const followerCount = user.follows;

  const handleClick = async () => {
    if (menu) return;
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
        changeView("chat", { id, name, photo, chatId, status, statusText, followerCount });
      } catch {}
    } else {
      navigate("/direct", { state: { id, name, photo, chatId, status, statusText, followerCount } });
    }
  };

  const handleMenu = (e) => {
    e.preventDefault();
    setMenu(!menu)
    setVisibility(!visibility)
  };

  const handleDelete = async () => {
    console.log('Deleting post', id);
    const response = await fetch(`http://localhost:8000/conversation/api/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({id: idUser})
    });

    if (response.ok) {
      setVisibility(false);
      setIsDelete(true);
      return;
    }
    if (!response.ok) {
      console.log('Error deleting conversation')
    }
    
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleMenu}
      className={`w-full flex gap-2 bg-first border-b border-gray-200 md:dark:bg-neutral-800 px-4 py-2 cursor-pointer relative ${isDelete ? "hidden" : ""}`}
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
          <span className={`text-end text-sm ${visibility ? "" : "hidden"}`}>{time ?? "—"}</span>
        </div>
        <p className="truncate text-neutral-700 text-sm">
          {message?.content ?? ""}
        </p>
      </div>
      {menu && (
        <div className=" text-white px-3 py-2 bg-red-500 flex items-center  gap-2 z-10 cursor-pointer" onClick={handleDelete}>
          <i className='bx bxs-trash text-white text-3xl hover:text-red-800 hover:text-4xl'></i>

        </div>)}
    </div>
  );
};
