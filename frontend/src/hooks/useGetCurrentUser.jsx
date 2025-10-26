import { useEffect, useState } from "react";

export default function useGetCurrentUser() {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const setCurrentUserFunction = (value) => setCurrentUser(value);
    useEffect(() => {
      async function getUser() {
        try {
          const response = await fetch("http://localhost:8000/me", {
            method: "GET",
            credentials: "include",
          });
  
          console.log("Response status:", response.status);
          if (response.ok) {
            const data = await response.json();
            setCurrentUser(data);
          } else {
            console.error("Failed to fetch user data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
  
      getUser();
    }, []);
    return {currentUser, setCurrentUserFunction, loading, error: !loading && !currentUser};
}
