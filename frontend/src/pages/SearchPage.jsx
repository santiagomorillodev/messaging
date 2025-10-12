import { useNavigate } from 'react-router-dom'
import avatar from "../assets/avatar.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
import UserSearchComponent from '../components/UserSearchComponent';
import { NavigationBar } from '../components/NavigationBar';
export function SearchPage() {
  const navigate = useNavigate()
  return (
    <section className='border-r border-neutral-500 md:min-w-[385px]'>
      <header className='w-full flex items-center gap-2 px-4 py-2 border-b border-neutral-500'>
          <i className="bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer" onClick={()=> navigate(-1)}></i>
        <input type="text" placeholder='Search...' className='p-2 bg-neutral-600 w-full rounded-2xl outline-0'/>
      </header>

      <main className='mb-15'>
        <p className='text-gray-400 text-sm px-4 py-2 font-bold'>Recent</p>
        <section className='flex flex-col gap-3 border-b border-neutral-500 pb-3'>
          <UserSearchComponent avatar={avatar} name='Santiago Javier Morillo' username='@santiagomorillodev'/>
          <UserSearchComponent avatar={avatar2} name='Juan Flores Farrugio' username='@santiagomorillodev'/>
          <UserSearchComponent avatar={avatar3} name='Esthefania Flores Farrugio' username='@santiagomorillodev'/>
        </section>
      </main>
      <div className='md:hidden'>
        <NavigationBar />
      </div>
    </section>
  )
}

//<p className='text-gray-400 text-sm px-4 py-2'>Search results for "query"</p>
