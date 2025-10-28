import { useEffect, useState, useRef } from 'react';
import { ChatSummary } from '../components/ChatSummary';
import Header from '../components/Header';
import { NavigationBar } from '../components/NavigationBar';
import GetAllConversation from "../hooks/GetAllConversation";
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export function Inbox() {
  const { conversations } = GetAllConversation();
  const { currentUser } = useGetCurrentUser();
  
  // ✅ Estado local para controlar si ya cargó las conversaciones
  const [localConversations, setLocalConversations] = useState([]);
  const hasInitialized = useRef(false); // evita renderizados duplicados

  // 🔹 Solo inicializa una vez con los datos del backend
  useEffect(() => {
    if (conversations && !hasInitialized.current) {
      setLocalConversations(conversations);
      hasInitialized.current = true;
    }
  }, [conversations]);

  // 🔹 Escuchar nuevos mensajes sin causar refetch
  useEffect(() => {
    const handleNewMessage = (event) => {
      const msg = event.detail;
      if (!msg || !msg.conversation_id) return;

      console.log("📩 Nuevo mensaje recibido en Inbox:", msg);

      setLocalConversations((prev) => {
        const exists = prev.some((c) => c.id === msg.conversation_id);
        let updated;

        if (exists) {
          updated = prev.map((c) =>
            c.id === msg.conversation_id
              ? {
                  ...c,
                  last_message: msg.content,
                  updated_at: msg.created_at,
                }
              : c
          );
        } else {
          // Si es una conversación nueva (poco común)
          updated = [
            ...prev,
            {
              id: msg.conversation_id,
              user: msg.sender_id === currentUser.id ? msg.receiver_id : msg.sender_id,
              last_message: msg.content,
              updated_at: msg.created_at,
            },
          ];
        }

        // 🔹 Ordenar por la más reciente
        return updated.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      });
    };

    window.addEventListener("new-message", handleNewMessage);
    return () => window.removeEventListener("new-message", handleNewMessage);
  }, [currentUser]);

  // 🔹 Render base
  if (!localConversations?.length) {
    return (
      <section className='md:min-w-[385px] border-r border-neutral-500 overflow-y-auto scroll-hidden'>
        <Header sectionName={'Chats'} />
        <main className="bg-white dark:bg-neutral-900 md:dark:bg-neutral-800 w-full flex flex-col gap-5 md:gap-0 mb-15 md:mb-0">
          <p className="text-center mt-4 text-neutral-400">No tienes conversaciones aún</p>
        </main>
      </section>
    );
  }

  return (
    <section className='md:min-w-[385px] border-r border-neutral-500 overflow-y-auto scroll-hidden bg-second'>
      <Header sectionName={'Chats'} />

      <main className="bg-second md:dark:bg-neutral-800 w-full flex flex-col gap-5 md:gap-0 mb-15 md:mb-0 ">
        <div className="mt-3 flex justify-center px-4">
          <input
            type="text"
            placeholder="Search for people"
            className="bg-gray-100 dark:bg-neutral-700 text-black dark:text-white p-2 rounded-2xl w-full outline-0"
          />
        </div>

        <section className='md:pt-3 overflow-y-auto scroll-hidden bg-second'>
          {localConversations.map((conversation) => (
            <ChatSummary
              key={conversation.id}
              idUser={conversation.user}
              conversationId={conversation.id}
              lastMessage={conversation.last_message}
              updatedAt={conversation.updated_at}
            />
          ))}
        </section>
      </main>

      <nav>
        <div className='md:hidden'>
          <NavigationBar />
        </div>
      </nav>
    </section>
  );
}
