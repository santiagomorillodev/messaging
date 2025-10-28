import { useEffect, useState } from "react";

export default function useSearchUser() {
  const [query, setQuery] = useState('')
    const [user, setUser] = useState({
      avatar_url: 'https://res.cloudinary.com/dyteo3qdh/image/upload/…99399/7be67d1818ede08376b6cb9c09c0ec13_dyiw1j.jpg',
      id: 0,
      name: "Unknown",
      username: "Unknown"
    });
  
  
    useEffect(() => {
      console.log('x')
      async function getUserByUsername() {
        try{
          const response = await fetch(`http://localhost:8000/search/username/${query}`, {
            method: "GET",
            credentials: "include",
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(prev => ({
              ...prev,
              avatar_url: userData.avatar_url ?? prev.avatar_url,
              id: userData.id ?? prev.id,
              name: userData.name ?? prev.name,
              username: userData.username ?? prev.username,
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


