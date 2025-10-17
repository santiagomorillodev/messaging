import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import { ChatSummary } from '../components/ChatSummary'
import Header from '../components/Header'
import { NavigationBar } from '../components/NavigationBar'


export function Inbox ()  {
    
  return (

  <section className='md:min-w-[385px] border-r border-neutral-500 overflow-y-auto scroll-hidden'>
    <Header sectionName={'Chats'}/>

    <main className="bg-white dark:bg-neutral-900 md:dark:bg-neutral-800 w-full flex flex-col gap-5 md:gap-0 mb-15 md:mb-0 ">
      <div className="mt-3 flex justify-center px-4">
        <input type="text" name="" id="" placeholder="Search for people" className="bg-gray-100 dark:bg-neutral-700 text-black dark:text-white p-2 rounded-2xl w-full outline-0"/>
      </div>
      <section className='md:pt-3 overflow-y-auto scroll-hidden'>
        <ChatSummary id={1} name='Laura' content='¡Hola Pedro! ¿Cómo va todo?' time='09:00' photo={photo} />
        <ChatSummary id={2} name='Carlos' content='¿Listo para la reunión de hoy?' time='10:15' photo={photo2} />
        <ChatSummary id={3} name='Ana' content='¡Buen trabajo en el reporte!' time='11:30' photo={photo3} />
      </section>
    </main>

    <nav>
      <div className='md:hidden'>
        <NavigationBar/>
      </div>
    </nav>

  </section>

  )
}