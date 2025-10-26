import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useDesktopView } from "../context/DesktopViewContext";
import useGetUser from "../hooks/useGetUser";
import Error from "./Error";
import useGetLastMessage from "../hooks/useGetLastMessage";
import { useEffect } from "react";
import { useWebSocket } from "../context/WebSocketContext.jsx"; // ⬅️ importar socket global

export const ChatSummary = ({ idUser, conversationId, content, time, refetchConversations }) => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const socket = useWebSocket(); // ⬅️ usar socket global

  const { user, loading: userLoading, error: userError } = useGetUser(idUser);
  const { lastMessage, loading: lastLoading, error: lastError, reload: reloadLast } =
    useGetLastMessage(conversationId);

  const loading = userLoading || lastLoading;
  const error = userError || lastError;

  // 🧠 Escuchar los mensajes entrantes del socket global
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (event) => {
      const data = event.detail;
      const { conversation_id, content } = data;

      // Solo actualiza si el mensaje pertenece a esta conversación
      if (conversation_id === conversationId) {
        console.log("📩 Actualizando ChatSummary:", conversation_id, content);
        // Aquí puedes refrescar el último mensaje
        reloadLast();
      }

      // Si quieres que el Inbox completo se actualice (últimos mensajes, orden, etc.)
      if (typeof refetchConversations === "function") {
        refetchConversations();
      }
    };

    window.addEventListener("new-message", handleNewMessage);
    return () => window.removeEventListener("new-message", handleNewMessage);
  }, [socket, conversationId, reloadLast, refetchConversations]);

  if (loading || error) {
    return (
      <Error
        loading={loading}
        error={error}
        onRetry={() => {
          reloadLast();
        }}
      />
    );
  }

  if (!user) return null;

  const id = user.id;
  const name = user.name;
  const photo = user.avatar_url;
  const chatId = conversationId;

  let changeView = () => {};
  try {
    ({ changeView } = useDesktopView());
  } catch {
    // Si falla el contexto, dejamos changeView como función vacía.
  }

  const handleClick = () => {
    if (isDesktop) {
      changeView("chat", { id, name, photo, chatId });
    } else {
      navigate("/direct", { state: { id, name, photo, chatId } });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex items-center gap-2 bg-white dark:bg-neutral-900 md:dark:bg-neutral-800 dark:text-white px-4 py-2"
    >
      <img
        src={photo}
        alt="user photo"
        width="50px"
        className="rounded-full min-w-[50px] h-[50px] object-cover"
      />
      <div className="w-full p-1 overflow-hidden">
        <div className="w-full flex justify-between">
          <span className="font-bold text-sm">{name}</span>
          <span className="text-end text-sm">{time ?? "—"}</span>
        </div>
        <p className="truncate text-neutral-400 text-sm">
          {lastMessage?.content ?? content ?? ""}
        </p>
      </div>
    </div>
  );
};
