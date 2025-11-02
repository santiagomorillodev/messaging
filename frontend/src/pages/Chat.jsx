import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageContainer } from "../components/MessageContainer";
import { useDesktopView } from "../context/DesktopViewContext";
import useGetMessages from "../hooks/useGetMessages";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useWebSocket } from "../context/WebSocketContext.jsx";

export function Chat() {
  const location = useLocation();
  const { currentUser } = useGetCurrentUser();
  const socket = useWebSocket();
  const [liveMessages, setLiveMessages] = useState([]);
  const inputRef = useRef();

  let viewData, resetView;
  try {
    ({ viewData, resetView } = useDesktopView());
  } catch {
    viewData = null;
    resetView = () => {};
  }

  const locationData = location.state || {};
  const chatData = locationData?.name ? locationData : viewData;
  const { name, photo, chatId, status } = chatData || {};
  const { messages, loading, error } = useGetMessages({ conversationId: chatId });
  const [initialLoad, setInitialLoad] = useState(true);
  console.log(name, photo, chatId)
  useEffect(() => {
    if (!loading && initialLoad) {
      setInitialLoad(false);
    }
  }, [loading, initialLoad])


useEffect(() => {
  if (!loading && messages.length > 0) {
    setLiveMessages(messages);
  }
}, [loading, messages]);


useEffect(() => {
  if (!socket || !chatId) return;

  const handleNewMessage = (event) => {
    const data = event.detail;

    if (data.conversation_id !== chatId) return;

    console.log("📩 Mensaje recibido en Chat.jsx:", data);

    setLiveMessages((prev) => {
      const exists = prev.some(
        (msg) =>
          msg.content === data.content &&
          msg.sender_id === data.sender_id &&
          msg.conversation_id === data.conversation_id
      );
      return exists ? prev : [...prev, data];
    });
  };

  window.addEventListener("new-message", handleNewMessage);
  return () => window.removeEventListener("new-message", handleNewMessage);
}, [socket, chatId]);


  

  if (!name) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>No hay chat seleccionado</p>
      </div>
    );
  }

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>Cargando chat...</p>
      </div>
    );
  }

  

  if (!currentUser) {
    return <p className="text-white">Cargando usuario...</p>;
  }




  // Enviar mensaje
  const handleSubmit = (event) => {
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    const message = event.target.value.trim();

    if (!socket) return console.warn("⚠️ No hay socket disponible");
    if (socket.readyState !== WebSocket.OPEN) return console.warn("⚠️ WS cerrado");

    const payload = {
      conversation_id: chatId,
      content: message,
      sender_id: currentUser.id,
      created_at: new Date().toISOString(),
    };

    console.log("📤 Enviando mensaje:", payload);
    socket.send(JSON.stringify(payload));

    // 🔹 Añade el mensaje al estado local instantáneamente
    setLiveMessages((prev) => [...prev, payload]);

    // 🔹 Notifica globalmente para actualizar ChatSummary
    window.dispatchEvent(new CustomEvent("new-message", { detail: payload }));

    event.target.value = "";
    const iconsContainer = document.querySelector(".chat-icons");
    if (iconsContainer) iconsContainer.style.display = "flex";

  }
};



  const allMessages = liveMessages;


  return (
    <div className="w-full h-screen md:h-full bg-second flex flex-col overflow-hidden">
      <header className="flex justify-between items-center w-full bg-first p-2">
        <div
          onClick={resetView}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={photo}
            alt=""
            width="45px"
            className="rounded-full min-w-[45px] h-[45px] object-cover"
          />
          <div>
            <p>{name}</p>
            <p>{status ? "Active now" : "Inactive"}</p>
          </div>
        </div>
        <i className="bx bx-phone text-4xl pr-6"></i>
      </header>

      <main className="flex flex-col gap-3 py-4 pr-6 pl-3 bg-second overflow-y-auto scroll-hidden flex-grow">
        {allMessages.length > 0 ? (
          allMessages.map((message, idx) => (
            <MessageContainer
              key={`${message.created_at}-${message.sender_id}-${idx}`}
              contenido={message.content}
              sender={currentUser.id === message.sender_id}
            />
          ))
        ) : (
          <p>No hay mensajes aun</p>
        )}
      </main>

      <footer className="bg-first w-full flex gap-2 items-center py-3 px-4">
        <div className="chat-icons flex items-center gap-2">
          <i className="bx bxs-camera text-2xl text-white bg-fourth rounded-full p-2"></i>
          <i className="bx bx-microphone text-3xl"></i>
          <i className="bx bx-image-alt text-3xl"></i>
        </div>

        <textarea
          ref={inputRef}
          placeholder="Send a message"
          className="outline-0 w-full bg-transparent resize-none overflow-y-auto max-h-[72px]"
          rows={1}
          onKeyDown={handleSubmit}
          onInput={(e) => {
            const hasText = e.target.value.trim() !== "";
            const iconsContainer = document.querySelector(".chat-icons");
            if (!iconsContainer) return;
            iconsContainer.style.display = hasText ? "none" : "flex";
          }}
        />
      </footer>

    </div>
  );
}
