import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function useSearchUser() {
  const [query, setQuery] = useState('')
    const [user, setUser] = useState({});

  useEffect(() => {
    console.log('x')
    async function getUserByUsername() {
        try{
          const response = await fetchWithAuth(`http://localhost:8000/search/username/${query}`, {
            method: "GET",
            credentials: "include",
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(({
              avatar_url: userData.avatar_url,
              id: userData.id,
              name: userData.name,
              username: userData.username,
            }));
            console.log('User data:', userData);
          }
        } catch (error) {
          console.error("Error fetching user by username:", error);
        }
      
    }
    getUserByUsername()
    console.log('Searching for user with username:', query);
  }, [query])

  return {user, query, setQuery}
}


