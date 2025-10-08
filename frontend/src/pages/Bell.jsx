import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { BellComponent } from '../components/BellComponent'
import { NavigationBar } from '../components/NavigationBar'

export function Bell ()  {
  return (
    <div>
        <nav className='flex justify-between items-center p-2 border-b-2 border-gray-200'>
          <i className="bx bx-chevron-left text-4xl"/>
          <p className='text-center text-xl'>Notification</p>
          <p></p>
        </nav>

        <section className=''>
          <BellComponent content='Juan Pérez ha comenzado a seguirte.' avatar={avatar}/>
          <BellComponent content='Frieren ha comenzado a seguirte.' avatar={avatar2}/>
          <BellComponent content='Carla ha comenzado a seguirte.' avatar={avatar3}/>
        </section>

        <NavigationBar/>

    </div>
  )
}
