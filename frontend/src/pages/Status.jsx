import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { NavigationBar } from '../components/NavigationBar'
import { StatusUser } from '../components/StatusUser'

export function Status ()  {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <header className='flex gap-4 w-full'>
        <h2 className='text-xl font-semibold'>Updates</h2>
        <input type="text" placeholder='Search' className='border-b-2 border-gray-200 w-full text-ms outline-0'/>
        <i className='bx bx-dots-vertical-rounded text-3xl'></i> 
      </header>

      <div className='flex gap-4'>
        <img src={avatar} alt="" width='45px' className='rounded-full min-w-[60px] h-[60px] object-cover'/>
        <div>
          <p>My status</p>
          <p>03:00 pm</p>
        </div>
      </div>

      <h3>recent status</h3>

      <section className='flex flex-col gap-4 mb-15'>
        <StatusUser name='Juan Perez' time={'03:33'} avatar={avatar}/>
        <StatusUser name='Maria Gomez' time={'08:15'} avatar={avatar2}/>
        <StatusUser name='Carlos Ruiz' time={'09:42'} avatar={avatar3}/>
      </section>
      <NavigationBar/>
    </div>
  )
}
