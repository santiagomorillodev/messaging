import { useLocation } from 'react-router-dom'
import { MessageContainer } from '../components/MessageContainer'
import { useDesktopView } from '../context/DesktopViewContext'

export function Chat() {
  const location = useLocation()

  let viewData, resetView
  try {
    ({ viewData, resetView } = useDesktopView())
  } catch {
    viewData = null
    resetView = () => {}
  }

  const locationData = location.state || {}

  const chatData = locationData?.name ? locationData : viewData
  const { name, photo } = chatData || {}

  if (!name) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>No hay chat seleccionado</p>
      </div>
    )
  }

  return (
    <div className='w-full h-screen md:h-full bg-neutral-900 flex flex-col overflow-hidden'>
      <header className='flex justify-between items-center w-full bg-white dark:bg-neutral-800 p-2'>
        <div onClick={resetView} className='flex items-center gap-2 cursor-pointer'>
          <img src={photo} alt="" width='45px' className='rounded-full min-w-[45px] h-[45px] object-cover'/>
          <div>
            <p>{name}</p>
            <p>Activo ahora</p>
          </div>
        </div>
        <i className='bx bx-phone text-4xl pr-6'></i>
      </header>

      <main className='flex flex-col gap-3 py-4 pr-6 pl-3 bg-neutral-700 overflow-y-auto scroll-hidden flex-grow'>
        <MessageContainer contenido={'Hola, como estas? soy el nuevo integrante del equipo'} sender={false}/>
        <MessageContainer contenido={'Hola, bien y tu? un placer, yo soy el líder del grupo'} sender={true}/>
        <MessageContainer contenido={'Gracias, estoy emocionado de empezar'} sender={false}/>
      </main>

      <footer className='bg-white w-full dark:bg-neutral-800 flex gap-2 items-center py-3 px-4 '>
        <i className="bx bxs-camera text-2xl text-white bg-blue-400 rounded-full p-2"></i>
        <input type="text" placeholder='Send a message' className='outline-0  w-full'/>
        <i className='bx bx-microphone text-3xl'></i>
        <i className='bx bx-image-alt text-3xl'></i>
      </footer>
    </div>
  )
}
