import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import UserSearchComponent from '../components/UserSearchComponent';
import { NavigationBar } from '../components/NavigationBar';
import Header from "../components/Header";
import { useEffect, useState } from "react";
import useSearchUser from "../hooks/useSearchUser";
export function SearchPage() {
  const [data, setData] = useState('')
  const {user, query, setQuery} = useSearchUser()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.trim() !== '') {
      setQuery(data);
    }
  }
  console.log(user, 'hello')
  return (
    <section className='border-r border-neutral-500 md:min-w-[385px]'>
      <Header sectionName={'Search user'}/>
      <form className='w-full flex items-center px-4 py-2 ' onSubmit={handleSubmit}>
        <input type="text" aria-label="Search" value={data} placeholder='Search...' className='p-2 bg-neutral-600 w-full rounded-2xl outline-0' onChange={(e)=> setData(e.target.value)} autoComplete="off"/>
        <button type="submit" className="sr-only">Search</button>
      </form>

      <main className='mb-15'>
        {query && <UserSearchComponent photo={user.avatar_url} name={user.name} username={`@${user.username}`}/>}
        <p className='text-gray-400 text-sm px-4 py-2 font-bold'>Recent</p>
        <section className='flex flex-col gap-3 border-b border-neutral-500 pb-3'>
          <UserSearchComponent photo={photo} name='Santiago Javier Morillo' username='@santiagomorillodev'/>
          <UserSearchComponent photo={photo2} name='Juan Flores Farrugio' username='@santiagomorillodev'/>
          <UserSearchComponent photo={photo3} name='Esthefania Flores Farrugio' username='@santiagomorillodev'/>
        </section>
      </main>
      <div className='md:hidden'>
        <NavigationBar />
      </div>
    </section>
  )
}