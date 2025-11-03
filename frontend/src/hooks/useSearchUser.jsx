import { useEffect, useState } from "react";
export default function useSearchUser() {
  const [query, setQuery] = useState('')
    const [user, setUser] = useState(null);

    useEffect(() => {
    if (!query || query.trim() === "") return;
    console.log('x')
    async function getUserByUsername() {
        try{
          const response = await fetch(`http://localhost:8000/search/username/${query}`, {
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


