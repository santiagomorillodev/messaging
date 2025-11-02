import React, { useEffect, useState } from 'react'
import useGetCurrentUser from './useGetCurrentUser';

export default function useGetAllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
      const fetchAllPosts = async () => {
          const response = await fetch(`http://localhost:8000/post/all`,{
              method: 'GET',
              credentials: 'include'
          });
          if (response.ok){
              const data = await response.json();
              console.log("📦 All posts fetched:", data);
              setAllPosts(data);
          } else {
              console.error('Failed to fetch allPosts');
          }
      };
      fetchAllPosts();
  }, []);
  console.log(allPosts)
    return {allPosts};
}
