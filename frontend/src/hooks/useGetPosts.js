import { useEffect, useState } from "react";

export default function useGetPosts({id}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPostsUser(){
      const response = await fetch(`http://localhost:8000/post/${id}`)
      if (response.ok){
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts')
      }
    }
    fetchPostsUser();

  }, [id]);
    return {posts};
}
