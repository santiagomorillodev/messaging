import photo3 from "../assets/photo3.jpg";
import { NavigationBar } from "../components/NavigationBar";
import { Posts } from "../components/Posts";
import ModalEditProfile from "../components/ModalEditProfile";
import useGetPosts from "../hooks/useGetPosts";
import useGetUser from "../hooks/useGetUser";
import { useLocation } from "react-router-dom";

export function ProfileOtherUser() {
  const location = useLocation();
  const otherUserId = location.state?.id || null;
  const {user, loading, error} = useGetUser(otherUserId);
  const {posts} = useGetPosts({id: user ? user.id : null});

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-400">
        Error loading user.
      </div>
    );
  }


  

  return (
    <>
      <section>
        <div
          className="w-full h-40 bg-first relative bg-cover bg-center"
          style={{ backgroundImage: `url(${photo3})` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          <img
            src={user.avatar_url}
            alt={`${user.name} avatar`}
            className="rounded-full w-30 h-30 object-cover absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 border-4 border-[#131318]"
          />
        </div>
      </section>

      <div className="w-full md:w-xl h-full md:h-[90vh] px-4 flex flex-col gap-5 mt-20">
        <div className="flex justify-between">
          <div>
            <p className="text-xl w-full ml-3 font-bold">{user['name']}</p>
            <p className="text-[12px] ml-3"><span>1000</span> Followers</p>
          </div>
          <ModalEditProfile photo={user.avatar_url} name={user.name} username={user.username} pronouns={'he'} bio={user.description}/>
        </div>
      <p className="text-white text-sm">{user.description}</p>
      <section className="flex items-center w-full gap-5 ">
      </section>

    </div>

    <h3 className="px-10 text-2xl font-semibold">Posts</h3>

     <section className=" flex flex-col items-center gap-10 overflow-y-auto scroll-hidden px-4 pt-10 pb-20 border-t border-gray-600">
        {
          posts ? posts.map((post) => (
            <Posts key={post.id} id={post.id} userId={user.id} name={user.name} avatar={user.avatar_url} postText={post.content} postImage={post.url} likes={post.likes}/>
          )) : <p>No posts available.</p>
        }
        
      </section>
      <div className="md:hidden">
        <NavigationBar /> 
      </div>

    </>
  );
}

