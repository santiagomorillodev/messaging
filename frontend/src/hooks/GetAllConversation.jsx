import { useEffect, useState } from 'react'

export default function GetAllConversation() {
  const [conversations, setConversations] = useState(null);
  

  useEffect(() => {
    async function getConversations() {
      try {
        const response = await fetch("http://localhost:8000/conversation/all", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setConversations(data);
        } else {
          console.error("Failed to fetch conversations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    }

    getConversations();
  }, []);

  return { conversations };
}
