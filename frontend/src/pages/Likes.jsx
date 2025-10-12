import NavSettings from "../components/NavSettings";
import { Posts } from "../components/Posts";
import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { NavigationBar } from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";

export default function Likes() {
  const navigate = useNavigate()
  return (
    <>
      <header className='mb-4'>
        <ul className="flex justify-between items-center px-4 py-2 bg-white dark:bg-neutral-800">
          <li><i className='bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer' onClick={() => navigate(-1)}></i></li>
          <li className='font-bold text-xl text-black dark:text-white'><p className='font-bold'>Likes</p></li>
          <li><NavSettings/></li>
        </ul>
      </header>

      <main className="grid grid-cols-3 gap-1 px-4">
        <Posts imagePost={avatar}/>
        <Posts imagePost={avatar2}/>
        <Posts imagePost={avatar3}/>
        <Posts imagePost={avatar2}/>
        <Posts imagePost={avatar3}/>
        <Posts imagePost={avatar}/>
      </main>

      <NavigationBar/>
    </>
  )
}
