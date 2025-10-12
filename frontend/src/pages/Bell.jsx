import { useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { BellComponent } from '../components/BellComponent'
import { NavigationBar } from '../components/NavigationBar'
import NavSettings from '../components/NavSettings'
import Header from '../components/Header'

export function Bell ()  {
  const navigate = useNavigate()
  return (
    <section className='md:min-w-[385px] border-r border-neutral-500'>
        <Header sectionName={'Notifications'}/>

        <section className='flex flex-col gap-3 border-b border-neutral-500 py-3'>
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
