import { useEffect, useRef, useState, useCallback } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useDesktopView } from "../context/DesktopViewContext";
import useGetMessages from "../hooks/useGetMessages";
import { MessageContainer } from "../components/MessageContainer";
import { useLocation, useNavigate } from "react-router-dom";

const Chat = () => {
  const socket = useWebSocket();
  const navigate = useNavigate();
  const { currentUser } = useGetCurrentUser();
  const location = useLocation();

  const desktopContext = (() => {
    try {
      return useDesktopView();
    } catch {
      return null;
    }
  })();

  const [liveMessages, setLiveMessages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [inputContent, setInputContent] = useState("");

  const [initialLoad, setInitialLoad] = useState(true);
  const inputRef = useRef();

  const chatData = location.state || {};
  const { id, name, photo, chatId, status } = chatData || {};

  const { messages = [], loading = false } = useGetMessages({
    conversationId: chatId,
  });

  useEffect(() => {
    if (!loading && initialLoad) {
      setLiveMessages(messages || []);
      setInitialLoad(false);
    }
  }, [loading, messages, initialLoad]);

  useEffect(() => {
    if (!socket || !chatId) return;

    const handleNewMessage = (event) => {
      const data = event.detail;
      if (data.conversation_id !== chatId) return;

      // evitar duplicados
      setLiveMessages((prev) => {
        const exists = prev.some(
          (msg) =>
            msg.content === data.content &&
            msg.image_base64 === data.image_base64 &&
            msg.sender_id === data.sender_id &&
            msg.created === data.created
        );

        return exists ? prev : [...prev, data];
      });
    };

    window.addEventListener("new-message", handleNewMessage);
    return () => window.removeEventListener("new-message", handleNewMessage);
  }, [socket, chatId]);

  // =====================================================================================
  // 🟣 ENVIAR TEXTO O IMAGEN (SIN DUPLICADOS EN FRONT)
  // =====================================================================================
  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    // 📌 Enviar imagen
    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = () => {
        const payload = {
          type: "image",
          sender_id: currentUser.id,
          conversation_id: chatId,
          content: inputContent || null,
          image_base64: reader.result,
          created: new Date().toISOString(),
        };

        socket.send(JSON.stringify(payload));

        // ❌ no agregamos a liveMessages aquí

        setSelectedImage(null);
        setInputContent("");
      };

      reader.readAsDataURL(selectedImage);
      return;
    }

    // 📌 Enviar texto
    if (!inputContent.trim()) return;

    const payload = {
      type: "message",
      sender_id: currentUser.id,
      conversation_id: chatId,
      content: inputContent.trim(),
      image_base64: null,
      created: new Date().toISOString(),
    };

    socket.send(JSON.stringify(payload));

    // ❌ no hacemos setLiveMessages aquí

    setInputContent("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!currentUser) return <p className="text-white">Cargando usuario...</p>;
  if (!name)
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>No hay chat seleccionado</p>
      </div>
    );
  if (initialLoad)
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>Cargando chat...</p>
      </div>
    );

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">

      {/* HEADER */}
      <header className="flex justify-between items-center w-full bg-first p-2 bg-second">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={photo}
            width="45px"
            className="rounded-full min-w-[45px] h-[45px] object-cover"
            onClick={() => navigate("/profile", { state: { id } })}
          />
          <div>
            <p>{name}</p>
            <p>{status ? "Active now" : "Inactive"}</p>
          </div>
        </div>
        <i
          className="bx bx-x text-4xl pr-6 cursor-pointer"
          onClick={() => navigate("/inbox")}
        ></i>
      </header>

      {/* MENSAJES */}
      <main className="flex flex-col gap-3 py-4 pr-6 pl-3 overflow-y-auto scroll-hidden flex-grow">
        {liveMessages.length > 0 ? (
          liveMessages.map((message, idx) => (
            <MessageContainer
              key={`${message.created}-${message.sender_id}-${idx}`}
              contenido={message.content}
              image={message.image_url}
              sender={currentUser.id === message.sender_id}
            />
          ))
        ) : (
          <p>No hay mensajes aún</p>
        )}
      </main>

      {/* PREVIEW DE IMAGEN */}
      {selectedImage && (
        <div className="w-[70%] p-3 bg-white rounded-md border border-white mx-4 mb-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-black font-medium">Imagen seleccionada</p>
            <button
              className="text-red-500 text-3xl"
              onClick={() => setSelectedImage(null)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <img
            src={URL.createObjectURL(selectedImage)}
            className="max-h-48 rounded-lg object-contain mx-auto"
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-first w-full flex gap-2 items-center py-3 px-4">

        {/* Subir imagen */}
        {!inputContent.trim() && !selectedImage && (
          <div className="chat-icons flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setSelectedImage(file);
              }}
              className="hidden"
              id="image-upload"
            />

            <label htmlFor="image-upload" className="cursor-pointer">
              <i className="bx bx-camera text-3xl text-white"></i>
            </label>
          </div>
        )}

        {/* Input único */}
        <textarea
          ref={inputRef}
          placeholder="Send a message"
          className="outline-0 w-full bg-transparent resize-none overflow-y-auto max-h-[72px] text-white"
          rows={1}
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {(inputContent.trim() || selectedImage) && (
          <button className="text-white text-3xl px-2" onClick={sendMessage}>
            <i className="bx bx-send"></i>
          </button>
        )}
      </footer>
    </div>
  );
};

export default Chat;
