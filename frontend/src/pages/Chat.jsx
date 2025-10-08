import avatar from '../assets/avatar.jpg'
import { MessageContainer } from '../components/MessageContainer'
export function Chat () {
  return (
    <>
        <header className='flex justify-between items-center fixed top-0 left-0 w-full bg-white z-50 '>
            <div className='flex gap-4 items-center'>
                <i className='bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer'></i>
                <img src={avatar} alt="" width='45px' className='rounded-full min-w-[45px] h-[45px] object-cover'/>
                <div>
                    <p>Santiago Morillo</p>
                    <p>Activo ahora</p>
                </div>
            </div>
            <i class='bx  bx-phone text-4xl'></i> 
        </header>

        <main className='mt-16 mb-25 flex flex-col gap-3 p-4'>
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



        <footer className='bg-white w-full fixed bottom-0'>
            <div className='flex justify-between items-center py-3 px-4  w-[93%] bg-gray-100 z-50 rounded-4xl mx-3 mb-3'>
                <div className='flex gap-4'>
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-400">
                    <i className="bx bxs-camera text-2xl text-white"></i>
                </button>
                <input type="text" placeholder='Send a message' className='outline-0 text-sm'/>
                {/*<textarea className="resize-none w-full p-2 rounded-2xl bg-gray-100 outline-0" rows={1} style={{maxHeight: '6.5em',overflow: 'auto',scrollbarWidth: 'none', msOverflowStyle: 'none'}} placeholder="Send a message" />*/}
            </div>

            <div className='flex'>
                <i class='bx bx-microphone text-3xl'></i> 
                <i class='bx  bx-image-alt text-3xl'></i>  
            </div>
            </div>
        </footer>
    </>
  )
}
