import { useState } from "react";
import avatar from "../assets/avatar.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
import { NavigationBar } from "../components/NavigationBar";
import { Posts } from "../components/Posts";
import FollowComponent from "../components/FollowComponent";

export function Profile() {
  const [showModalFollowers, setShowModalFollows] = useState(false)
  const [follow, setFollow] = useState(false)

  return (
      <div className="w-full h-screen px-4 flex flex-col gap-5">
        <nav>
          <ul className="flex justify-between items-center border-b-2 border-gray-200">
            <li className="flex items-center gap-2">
              <i className="bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer"></i>
              <p className="font-bold">@santiagomorillodev</p>
            </li>
            <li>
              <i className="bx bx-dots-vertical-rounded text-3xl"></i>{" "}
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
                  <p>followed</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full flex justify-between">
          <button className={follow ? "py-1 px-10 bg-red-500 rounded-sm text-white cursor-pointer" : "py-1 px-10 bg-blue-400 rounded-sm text-white cursor-pointer"} onClick={()=> setFollow(!follow)}>
            {follow ? 'Unfollow' : 'Follow'}
          </button>
          <p className="py-1 px-10 bg-gray-100 rounded-sm">
            Send message
          </p>
        </section>

        <section className="grid grid-cols-3 gap-1">
          <Posts imagePost={avatar} />
          <Posts imagePost={avatar2} />
          <Posts imagePost={avatar3} />
        </section>
        <NavigationBar />

      {showModalFollowers && (
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

      </div>
  );
}

