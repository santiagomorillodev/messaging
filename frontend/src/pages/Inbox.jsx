import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpeg";
import photo6 from "../assets/photo6.jpg";
import photo7 from "../assets/photo7.jpg";
import photo8 from "../assets/photo8.jpg";
import photo9 from "../assets/photo9.jpg";
import photo10  from "../assets/photo10.jpg";
import photo11 from "../assets/photo11.jpg";
import photo12 from "../assets/photo12.jpg";
import photo13 from "../assets/photo13.jpg";
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
        <ChatSummary name='Santiago' content='¡Hola Juan! ¿Cómo estás?' time='03:33' photo={photo} />
        <ChatSummary name='Santiago' content='¡Hola María! 📝 ¿Terminaste el proyecto?' time='12:00' photo={photo2} />
        <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' photo={photo3} />
        <ChatSummary name='Santiago' content='¡Hola Juan! ¿Cómo estás?' time='03:33' photo={photo4} />
        <ChatSummary name='Santiago' content='¡Hola María! 📝 ¿Terminaste el proyecto?' time='12:00' photo={photo5} />
        <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' photo={photo3} />
        <ChatSummary name='Santiago' content='¡Hola Juan! ¿Cómo estás?' time='03:33' photo={photo6} />
        <ChatSummary name='Santiago' content='¡Hola María! 📝 ¿Terminaste el proyecto?' time='12:00' photo={photo7} />
        <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' photo={photo8} />
        <ChatSummary name='Santiago' content='¡Hola Juan! ¿Cómo estás?' time='03:33' photo={photo9} />
        <ChatSummary name='Santiago' content='¡Hola María! 📝 ¿Terminaste el proyecto?' time='12:00' photo={photo10} />
        <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' photo={photo11} />
        <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' photo={photo12} />
        <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' photo={photo13} />
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