import photo from '../assets/photo.jpg'
import Header from '../components/Header'
import { NavigationBar } from '../components/NavigationBar'
import { Posts } from '../components/Posts'

export function Status ()  {
  return (
    <div className='flex flex-col gap-4  md:min-w-[385px] border-r border-neutral-500 mb-15 md:mb-0'>
      <Header sectionName={'Updates'}/>
      <section className='flex flex-col gap-4 py-4 px-6'>
        <Posts name='John Doe' avatar={photo} post={'https://res.cloudinary.com/dyteo3qdh/image/upload/v1749930061/mis_imagenes/vkrpk0am2k8uzurby9l1.jpg'} description='This is my first post.'/>
        <Posts name='John Doe' avatar={photo} post={'Hoy es un recordatorio amable: no necesitas tenerlo todo resuelto para dar el primer paso. La magia está en comenzar, aprender en el camino y ajustar cuando haga falta. ¿Qué pequeño movimiento vas a hacer hoy?'} description='This is my first post.'/>
        <Posts name='John Doe' avatar={photo} post={'https://res.cloudinary.com/dyteo3qdh/image/upload/v1749919113/mis_imagenes/vwkxtfytuuhbqtqf2axw.jpg'} description='This is my first post.'/>
        <Posts name='John Doe' avatar={photo} post={'Tip rápido: reserva 30 minutos al día para trabajar sin distracciones en lo que más importa. Verás cómo proyectos que parecían imposibles comienzan a avanzar con constancia y foco.'} description='This is my first post.'/>
        <Posts name='John Doe' avatar={photo} post={'https://res.cloudinary.com/dyteo3qdh/image/upload/v1761762194/Gorillaz_-_Poster_design_lrwzx0.jpg'} description='This is my first post.'/>
        <Posts name='John Doe' avatar={photo} post={'¿Cuál fue la mejor lección que aprendiste este año? Comparte una experiencia en los comentarios — puede que tu historia inspire a alguien más a seguir adelante.'} description='This is my first post.'/>
        <Posts name='John Doe' avatar={photo} post={'https://res.cloudinary.com/dyteo3qdh/image/upload/v1761762194/e07cf169-215e-4575-93c1-406050f50768_j3pz04.jpg'} description='This is my first post.'/>
        <Posts name='John Doe' avatar={photo} post={'Detrás de cámaras: estamos preparando algo nuevo que combina creatividad y utilidad para facilitar tu día a día. Pronto compartiremos más detalles — mantente atent@ para la fecha de lanzamiento.'} description='This is my first post.'/>
      </section>
      <div className='md:hidden'><NavigationBar/></div>
    </div>
  )
}

{
  // <p className='text-white text-center'>No status updates available.</p>
  // <p className='text-white text-center'>Check back later for updates from people you follow.</p>
}