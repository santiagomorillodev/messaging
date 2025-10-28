import { useNavigate } from "react-router-dom";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useDesktopView } from "../context/DesktopViewContext";
import useGetUser from "../hooks/useGetUser";
import Error from "./Error";
import useGetLastMessage from "../hooks/useGetLastMessage";
import { useEffect } from "react";
import { useWebSocket } from "../context/WebSocketContext.jsx";

export const ChatSummary = ({ idUser, conversationId, content, time, refetchConversations }) => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const socket = useWebSocket();

  const { user, loading: userLoading, error: userError } = useGetUser(idUser);
  const { lastMessage, loading: lastLoading, error: lastError, reload: reloadLast } =
    useGetLastMessage(conversationId);

  const loading = userLoading || lastLoading;
  const error = userError || lastError;

  let changeView = () => {};
  try {
    ({ changeView } = useDesktopView());
  } catch {
  }

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (event) => {
      const data = event.detail;
      const { conversation_id, content } = data;

      if (conversation_id === conversationId) {
        console.log("📩 Actualizando ChatSummary:", conversation_id, content);
        reloadLast();
      }

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
      className="w-full flex items-center gap-2 bg-first md:dark:bg-neutral-800 dark:text-white px-4 py-2"
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
