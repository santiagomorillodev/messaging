import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { NavigationBar } from '../components/NavigationBar'
import NavSettings from '../components/NavSettings'
import { StatusUser } from '../components/StatusUser'

export function Status ()  {
  return (
    <div className='flex flex-col gap-4 p-4  md:min-w-[385px] border-r border-neutral-500 mb-15 md:mb-0'>
      <header className='flex gap-4 w-full'>
        <h2 className='text-xl'>Updates</h2>        
      </header>

      <StatusUser name='Tu historia' time={'Hace 1 hora'} avatar={avatar}/>

      <h3>recent status</h3>

      <section className='flex flex-col gap-4 mb-15'>
        <StatusUser name={'Juan Perez'} time={'03:33'} avatar={avatar}/>
        <StatusUser name={'Maria Gomez'} time={'08:15'} avatar={avatar2}/>
        <StatusUser name={'Carlos Ruiz'} time={'09:42'} avatar={avatar3}/>
      </section>
      <div className='md:hidden'><NavigationBar/></div>
    </div>
  )
}
