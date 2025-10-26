import { useEffect, useState } from 'react';
import { ChatSummary } from '../components/ChatSummary';
import Header from '../components/Header';
import { NavigationBar } from '../components/NavigationBar';
import GetAllConversation from "../hooks/GetAllConversation";
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export function Inbox() {
  const { conversations } = GetAllConversation();
  const { currentUser } = useGetCurrentUser();

  // 👇 Copia local que se actualiza sin refetch
  const [localConversations, setLocalConversations] = useState([]);

  // 🔹 Cuando llegan las conversaciones iniciales, sincronízalas
  useEffect(() => {
    if (conversations) setLocalConversations(conversations);
  }, [conversations]);

  // 🔹 Escucha nuevos mensajes globalmente
  useEffect(() => {
    const handleNewMessage = (event) => {
      const msg = event.detail;
      console.log("📩 Nuevo mensaje recibido en Inbox:", msg);

      setLocalConversations((prev) => {
        // Ver si la conversación ya existe
        const exists = prev.some((c) => c.id === msg.conversation_id);
        let updated;

        if (exists) {
          // Actualiza la conversación existente (último mensaje y fecha)
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
          // Si es una conversación nueva (poco común), agrégala
          updated = [
            ...prev,
            {
              id: msg.conversation_id,
              last_message: msg.content,
              updated_at: msg.created_at,
              first_user_id: msg.sender_id,
              second_user_id: currentUser?.id,
            },
          ];
        }

        // Ordena las conversaciones por último mensaje
        return updated.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      });
    };

    window.addEventListener("new-message", handleNewMessage);
    return () => window.removeEventListener("new-message", handleNewMessage);
  }, [currentUser]);

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
    <section className='md:min-w-[385px] border-r border-neutral-500 overflow-y-auto scroll-hidden'>
      <Header sectionName={'Chats'} />

      <main className="bg-white dark:bg-neutral-900 md:dark:bg-neutral-800 w-full flex flex-col gap-5 md:gap-0 mb-15 md:mb-0 ">
        <div className="mt-3 flex justify-center px-4">
          <input
            type="text"
            placeholder="Search for people"
            className="bg-gray-100 dark:bg-neutral-700 text-black dark:text-white p-2 rounded-2xl w-full outline-0"
          />
        </div>

        <section className='md:pt-3 overflow-y-auto scroll-hidden'>
          {localConversations.map((conversation) => (
            <ChatSummary
              key={conversation.id}
              idUser={
                conversation.first_user_id === currentUser?.id
                  ? conversation.second_user_id
                  : conversation.first_user_id
              }
              conversationId={conversation.id}
              // 👇 pasa el último mensaje al ChatSummary
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
