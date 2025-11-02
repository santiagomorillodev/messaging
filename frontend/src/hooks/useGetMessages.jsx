import { useEffect, useState } from 'react'

export default function useGetMessages({conversationId}) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchMessages() {
        try {
          const res = await fetch(`http://localhost:8000/inbox/chat/${conversationId}`, {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      }
    
      return () => {
        fetchMessages();
      }
    }, [conversationId])

    return {messages, loading, error: !loading && messages.length === 0};
}
