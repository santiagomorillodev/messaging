import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { ChatSummary } from '../components/ChatSummary'
import logo from '../assets/logo.jpeg'
import { NavigationBar } from '../components/NavigationBar'
export function Inbox ()  {
  return (
    <>
        <header>
            <ul className="flex justify-between p-4 bg-white">
                <li><img src={logo} alt="logo de la app" width='12px' height='12px' className='rounded-full min-w-[25px] min-h-[25px] object-cover' /></li>
                <li className='font-bold text-xl'><p className='font-bold'>Messages</p></li>
                <li><i className='bx  bx-cog text-black text-2xl'></i> </li>
            </ul>
        </header>
    
        <main className="bg-white w-full flex flex-col gap-5 mb-15">

            <div className="bg-white flex justify-center px-4">
                <input type="text" name="" id="" placeholder="Search for people" className="bg-gray-100 p-2 rounded-2xl w-full outline-0"/></div>

            <section>
                <ChatSummary name='Santiago' content='¡Hola Juan! ¿Cómo estás?' time='03:33' avatar={avatar} />
                <ChatSummary name='Santiago' content='¡Hola María! 📝 ¿Terminaste el proyecto?' time='12:00' avatar={avatar2} />
                <ChatSummary name='Santiago' content='Felicidades por tu nuevo trabajo.' time='15:00' avatar={avatar3} />
            </section>
        </main>

        <nav>
            <NavigationBar/>
        </nav>
    </>
  )
}
