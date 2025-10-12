import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { ChatSummary } from '../components/ChatSummary'
import { NavigationBar } from '../components/NavigationBar'
import NavSettings from '../components/NavSettings'


export function Inbox ()  {
    
  return (

  <section className='md:min-w-[385px] border-r border-neutral-500'>
    <header>
      <ul className="flex justify-between px-4 py-2 bg-white dark:bg-neutral-800">
        <li className='font-bold text-xl text-black dark:text-white'>
          <p className='font-bold md:text-lg'>Chats</p>
        </li>
        <li><p className="p-2"></p></li>
        <li>
          <NavSettings/>
        </li>
      </ul>
    </header>

    <main className="bg-white dark:bg-neutral-900 md:dark:bg-neutral-800 w-full flex flex-col gap-5 md:gap-0 mb-15 md:mb-0">
      <div className="bg-white dark:bg-neutral-800 flex justify-center px-4">
        <input type="text" name="" id="" placeholder="Search for people" className="bg-gray-100 dark:bg-neutral-700 text-black dark:text-white p-2 rounded-2xl w-full outline-0"/>
      </div>
      <section className='md:pt-3'>
        <ChatSummary name='Santiago' content='¡Hola Juan! ¿Cómo estás?' time='03:33' avatar={avatar} />
        <ChatSummary name='Santiago' content='¡Hola María! 📝 ¿Terminaste el proyecto?' time='12:00' avatar={avatar2} />
        <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' avatar={avatar3} />
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