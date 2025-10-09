import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
import { NavigationBar } from "../components/NavigationBar";
import { Posts } from "../components/Posts";
import FollowComponent from "../components/FollowComponent";

export function Profile() {
  const navigate = useNavigate()
  const [showModalFollows, setShowModalFollows] = useState(false)
  const [showModalLogOut, setShowModalLogOut] = useState(false)
  const [follow, setFollow] = useState(false)

  return (
    <div className="w-full h-screen px-4 flex flex-col gap-5">
      <nav>
        <ul className="flex justify-between items-center border-b-2 border-gray-200">
          <li className="flex items-center gap-2">
            <button onClick={()=> navigate(-1)}><i className="bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer"></i></button>
            <p className="font-bold">@santiagomorillodev</p>
          </li>
          <li>
            <p className="p-2"></p>
          </li>
        </ul>
      </nav>

      <section className="flex w-full gap-5 ">
        <img
          src={avatar}
          alt=""
          width="55px"
          className="rounded-full min-w-[65px] h-[65px] object-cover"
        />
        <div className="flex flex-col gap-1">
          <p>santiago Morillo</p>
          <div className="w-full">
            <ul className=" flex justify-between">
              <li className="p-2">
                <p>40</p>
                <p>publicaciones</p>
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

      <section className="w-full flex justify-between">
        <button className="py-1 px-10 bg-gray-100 rounded-sm cursor-pointer ">Edit profile</button>
        <p className="py-1 px-10 bg-gray-100 rounded-sm cursor-pointer">
          New post
        </p>
      </section>

      <section className="grid grid-cols-3 gap-1">
        <Posts imagePost={avatar} />
        <Posts imagePost={avatar2} />
        <Posts imagePost={avatar3} />
      </section>
      <NavigationBar />

    {showModalFollows && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
        <div className="w-full h-80 bg-white rounded-3xl flex flex-col gap-2">
          <ul className="flex justify-between border-b border-gray-400 py-2 px-4 font-semibold text-lg h-10">
            <li className="px-2"></li>
            <li >Followers</li>
            <li onClick={() => setShowModalFollows(false)}><i className='bx  bx-x text-black text-3xl cursor-pointer'></i> </li>
          </ul>
          <div className="p-2">
            <div className="w-full h-8 flex items-center gap-3 bg-gray-100 rounded-sm">
            <i class='bx  bx-search'  ></i>
            <input type="text" placeholder="Search" className="outline-0"/>
          </div>
          </div>
          <section className=" overflow-y-auto ">
            <div className="flex flex-col gap-2">
              <FollowComponent avatar={avatar}/>
              <FollowComponent avatar={avatar2}/>
              <FollowComponent avatar={avatar3}/>
              <FollowComponent avatar={avatar}/>
              <FollowComponent avatar={avatar2}/>
              <FollowComponent avatar={avatar3}/>
              <FollowComponent avatar={avatar}/>
              <FollowComponent avatar={avatar2}/>
              <FollowComponent avatar={avatar3}/>
              <FollowComponent avatar={avatar}/>
              <FollowComponent avatar={avatar2}/>
              <FollowComponent avatar={avatar3}/>
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

