import avatar from '../assets/avatar.jpg'
import { MessageContainer } from '../components/MessageContainer'

export function Chat () {
  return (
    <div className='w-full h-screen md:h-full bg-neutral-900 flex flex-col overflow-hidden'>
      <header className='flex justify-between items-center w-full bg-white dark:bg-neutral-800 p-2'>
        <div className='flex items-center'>
          <i className='bx bx-chevron-left text-blue-400 text-4xl cursor-pointer'></i>
          <img src={avatar} alt="" width='45px' className='rounded-full min-w-[45px] h-[45px] object-cover'/>
          <div>
            <p>Santiago Morillo</p>
            <p>Activo ahora</p>
          </div>
        </div>
        <i className='bx bx-phone text-4xl pr-6'></i>
      </header>

      <main className='flex flex-col gap-3 py-4 pr-6 pl-3 bg-neutral-700 overflow-y-auto scroll-hidden flex-grow'>
        <MessageContainer contenido={'Hola, como estas? soy el nuevo integrante del equipo'} sender={false}/>
            <MessageContainer contenido={'Hola, bien y tu? un placer, yo soy el líder del grupo'} sender={true}/>
            <MessageContainer contenido={'Gracias, estoy emocionado de empezar'} sender={false}/>
            <MessageContainer contenido={'¡Qué bueno! Cuéntame, ¿en qué área te gustaría colaborar?'} sender={true}/>
            <MessageContainer contenido={'Me gustaría apoyar en desarrollo frontend, tengo experiencia en React'} sender={false}/>
            <MessageContainer contenido={'Perfecto, justo estamos trabajando en una nueva interfaz. ¿Te gustaría revisarla?'} sender={true}/>
            <MessageContainer contenido={'Sí, claro. ¿Puedes pasarme el repositorio?'} sender={false}/>
            <MessageContainer contenido={'Te acabo de compartir el enlace en el canal del equipo'} sender={true}/>
            <MessageContainer contenido={'Lo recibí, lo estoy revisando ahora'} sender={false}/>
            <MessageContainer contenido={'Avísame si tienes cualquier pregunta o sugerencia'} sender={true}/>
            <MessageContainer contenido={'Por cierto, ¿cómo organizan las tareas?'} sender={false}/>
            <MessageContainer contenido={'Usamos GitHub Projects, te agrego al tablero en unos minutos'} sender={true}/>
            <MessageContainer contenido={'Genial, muchas gracias. ¿Hay alguna reunión esta semana?'} sender={false}/>
            <MessageContainer contenido={'Sí, tenemos una reunión de planificación el jueves a las 10am'} sender={true}/>
            <MessageContainer contenido={'Perfecto, ahí estaré. Gracias por la bienvenida!'} sender={false}/>
      </main>

      <footer className='bg-white w-full dark:bg-neutral-800 flex gap-2 items-center py-3 px-4 z-50 '>
            <i className="bx bxs-camera text-2xl text-white bg-blue-400 rounded-full p-2"></i>
            
            <input type="text" placeholder='Send a message' className='outline-0  w-full'/>
          
            <i className='bx bx-microphone text-3xl'></i>
            <i className='bx bx-image-alt text-3xl'></i>
      </footer>
    </div>
  )
}