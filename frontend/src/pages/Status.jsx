import photo from '../assets/photo.jpg'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'
import Header from '../components/Header'
import { NavigationBar } from '../components/NavigationBar'
import { StatusUser } from '../components/StatusUser'

export function Status ()  {
  return (
    <div className='flex flex-col gap-4  md:min-w-[385px] border-r border-neutral-500 mb-15 md:mb-0'>
      <Header sectionName={'Updates'}/>

      <section className='flex flex-col gap-6 px-4'>
        <StatusUser name='Tu historia' time={'Hace 1 hora'} photo={photo}/>

        <h3>recent status</h3>

        <section className='flex flex-col gap-4 mb-15'>
          <StatusUser name={'Juan Perez'} time={'03:33'} photo={photo}/>
          <StatusUser name={'Maria Gomez'} time={'08:15'} photo={photo2}/>
          <StatusUser name={'Carlos Ruiz'} time={'09:42'} photo={photo3}/>
        </section>
      </section>
      <div className='md:hidden'><NavigationBar/></div>
    </div>
  )
}
