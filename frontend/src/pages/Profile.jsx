import { useEffect, useState } from "react";
import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import { NavigationBar } from "../components/NavigationBar";
import { Posts } from "../components/Posts";
import FollowComponent from "../components/FollowComponent";
import ModalEditProfile from "../components/ModalEditProfile";
import useGetCurrentUser from "../hooks/useGetCurrentUser";

export function Profile() {
  const [showModalFollows, setShowModalFollows] = useState(false)
  const {currentUser, loading, error} = useGetCurrentUser();

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
        {/* photo3 como fondo que cubre todo el div sin afectar layout */}
        <div
          className="w-full h-40 bg-first relative bg-cover bg-center"
          style={{ backgroundImage: `url(${photo3})` }}
        >
          {/* sombra en la parte inferior, va hacia arriba */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          <img
            src={currentUser.avatar_url}
            alt={`${currentUser.name} avatar`}
            className="rounded-full w-30 h-30 object-cover absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 border-4 border-[#131318]"
          />
        </div>
      </section>

      <div className="w-full md:w-xl h-full md:h-[90vh] px-4 flex flex-col gap-5 mt-20">
        <div>
          <p className="text-xl w-full ml-3 font-bold">{currentUser['name']}</p>
          <p className="text-[12px] ml-3"><span>1000</span> Followers</p>
        </div>
      <p className="text-white text-sm">Desarrollador web y móvil | React, React Native, Node.js, MongoDB, SQL, HTML, CSS, JavaScript | Colombia</p>
      <section className="flex items-center w-full gap-5 ">
      </section>



      <section className="w-full flex gap-5">
        <p className="py-1 px-10 bg-fifth rounded-sm cursor-pointer">New post</p>
        <ModalEditProfile photo={photo} name={'Santiago'} username={'santiagomorillodev'} pronouns={'He'} bio={'Desarrollador web y móvil | React, React Native, Node.js, MongoDB, SQL, HTML, CSS, JavaScript | Colombia'} gender={'Male'}/>
      </section>
    </div>

    <h3 className="px-10 pt-10 text-2xl font-semibold">Posts</h3>

     <section className=" flex flex-col items-center gap-10 overflow-y-auto scroll-hidden px-4 pt-10 pb-20 border-t border-gray-600">
        <Posts name={currentUser.name} avatar={currentUser.avatar_url} post={photo}  description={'Esta es una description random'}/>
        <Posts name={currentUser.name} avatar={currentUser.avatar_url} post={photo2}  description={'Esta es una description random'}/>
        <Posts name={currentUser.name} avatar={currentUser.avatar_url} post={photo3}  description={'Esta es una description random'}/>
        
      </section>
      <div className="md:hidden">
        <NavigationBar /> 
      </div>

    

    {showModalFollows && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
        <div className="w-full h-80 bg-white dark:bg-neutral-900 rounded-3xl flex flex-col gap-2">
          <ul className="flex justify-between border-b border-gray-400 py-2 px-4 font-semibold text-lg h-10">
            <li className="px-2"></li>
            <li >Followers</li>
            <li onClick={() => setShowModalFollows(false)}><i className='bx  bx-x text-black dark:text-white text-3xl cursor-pointer'></i> </li>
          </ul>
          <div className="p-2">
            <div className="w-full h-8 flex items-center gap-3 bg-gray-100 dark:bg-neutral-800 rounded-sm">
            <i class='bx  bx-search'  ></i>
            <input type="text" placeholder="Search" className="outline-0"/>
          </div>
          </div>
          <section className=" overflow-y-auto ">
            <div className="flex flex-col gap-2">
              <FollowComponent photo={photo}/>
              <FollowComponent photo={photo2}/>
              <FollowComponent photo={photo3}/>
              <FollowComponent photo={photo}/>
              <FollowComponent photo={photo2}/>
              <FollowComponent photo={photo3}/>
              <FollowComponent photo={photo}/>
              <FollowComponent photo={photo2}/>
              <FollowComponent photo={photo3}/>
              <FollowComponent photo={photo}/>
              <FollowComponent photo={photo2}/>
              <FollowComponent photo={photo3}/>
            </div>
          </section>
        </div>
      </div>
    )}
    </>
  );
}

