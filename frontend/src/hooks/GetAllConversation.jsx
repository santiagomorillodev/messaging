import { useEffect, useState } from 'react'
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function GetAllConversation() {
  const [conversations, setConversations] = useState(null);
  

  useEffect(() => {
    async function getConversations() {
      try {
        const response = await fetchWithAuth("http://localhost:8000/conversation/all", {
          method: "GET",
          credentials: "include",
        });

        console.log("Response status:", response.status);
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
