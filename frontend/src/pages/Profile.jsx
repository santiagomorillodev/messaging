import { useState } from "react";
import { useNavigate } from "react-router-dom";
import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpeg";
import photo6 from "../assets/photo6.jpg";
import photo7 from "../assets/photo7.jpg";
import photo8 from "../assets/photo8.jpg";
import photo9 from "../assets/photo9.jpg";
import photo10  from "../assets/photo10.jpg";
import photo11 from "../assets/photo11.jpg";
import photo12 from "../assets/photo12.jpg";
import photo13 from "../assets/photo13.jpg";
import { NavigationBar } from "../components/NavigationBar";
import { Posts } from "../components/Posts";
import FollowComponent from "../components/FollowComponent";
import ModalEditProfile from "../components/ModalEditProfile";

export function Profile() {
  const navigate = useNavigate()
  const [showModalFollows, setShowModalFollows] = useState(false)

  return (
    <div className="w-full md:w-xl h-full md:h-[90vh] px-4 flex flex-col gap-5 bg-neutral-900">
      <nav>
        <ul className="flex justify-between items-center border-b-2 border-gray-200">
          <li className="flex items-center gap-2">
            <button onClick={()=> navigate(-1)}><i className="bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer md:hidden"></i></button>
            <p className="font-bold">@santiagomorillodev</p>
          </li>
          <li><p className="p-2"></p></li>
        </ul>
      </nav>

      <section className="flex items-center w-full gap-5 ">
        <img
          src={photo}
          alt=""
          width="80px"
          className="rounded-full min-w-[80px] h-[80px] object-cover"
        />
        <div className="flex flex-col gap-1">
          <p>santiago Morillo</p>
          <div className="w-full">
            <ul className=" flex justify-between">
              <li className="p-2">
                <p>40</p>
                <p>Posts</p>
              </li>
              <li className="p-2 cursor-pointer transition-all duration-150 ease-in-out hover:font-bold" onClick={()=> setShowModalFollows(true)}>
                <p>1500</p>
                <p>Followers</p>
              </li>
              <li className="p-2 cursor-pointer transition-all duration-150 ease-in-out hover:font-bold" onClick={()=> setShowModalFollows(true)}>
                <p>2900</p>
                <p>following</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <p className="text-white text-sm">Desarrollador web y móvil | React, React Native, Node.js, MongoDB, SQL, HTML, CSS, JavaScript | Colombia</p>


      <section className="w-full flex justify-between ">
        <ModalEditProfile photo={photo} name={'Santiago'} username={'santiagomorillodev'} pronouns={'He'} bio={'Desarrollador web y móvil | React, React Native, Node.js, MongoDB, SQL, HTML, CSS, JavaScript | Colombia'} gender={'Male'}/>
        <p className="py-1 px-10 bg-gray-100 dark:bg-neutral-600 rounded-sm cursor-pointer">
          New post
        </p>
      </section>

      <section className="grid grid-cols-3 gap-1 overflow-y-auto scroll-hidden pb-20">
        <Posts imagePost={photo} />
        <Posts imagePost={photo2} />
        <Posts imagePost={photo3} />
        <Posts imagePost={photo4} />
        <Posts imagePost={photo5} />
        <Posts imagePost={photo6} />
        <Posts imagePost={photo7} />
        <Posts imagePost={photo8} />
        <Posts imagePost={photo9} />
        <Posts imagePost={photo10} />
        <Posts imagePost={photo11} />
        <Posts imagePost={photo12} />
        <Posts imagePost={photo13} />
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

    {/* {showModalLogOut && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
        <div className="w-full bg-white rounded-3xl flex flex-col gap-4 p-4 ">
          <h3 className="text-center text-xl font-semibold">Are you sure you want to log out of your account?</h3>
          <div className="flex justify-between px-7">
            <button className="py-2 px-5 bg-red-500 font-semibold text-white rounded-xl cursor-pointer">Go out</button>
            <button className="py-2 px-5 bg-blue-500 font-semibold text-white rounded-xl cursor-pointer" onClick={()=> setShowModalLogOut(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )} */}

    </div>
  );
}

