import { useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { BellComponent } from '../components/BellComponent'
import { NavigationBar } from '../components/NavigationBar'
import NavSettings from '../components/NavSettings'

export function Bell ()  {
  const navigate = useNavigate()
  return (
    <section className='md:min-w-[385px] border-r border-neutral-500'>
        <nav className='w-full flex items-center justify-between md:justify-start px-4 py-2 border-b border-neutral-500'>
          <i className="bx bx-chevron-left text-4xl text-blue-400" onClick={() => navigate(-1)}/>
          <p className='text-center text-xl'>Notification</p>
          <NavSettings/>
        </nav>

        <section className='flex flex-col gap-3 border-b border-neutral-500 pb-3'>
          <BellComponent content='ha comenzado a seguirte.' avatar={avatar} username='@juanperez'/>
          <BellComponent content='ha comenzado a seguirte.' avatar={avatar2} username='@frieren'/>
          <BellComponent content='ha comenzado a seguirte.' avatar={avatar3} username='@carla'/>
        </section>

        <div className='md:hidden'>
          <NavigationBar />
        </div>

    </section>
  )
}
