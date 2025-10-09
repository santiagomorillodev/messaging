import avatar from '../assets/avatar.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import { ChatSummary } from '../components/ChatSummary'
import { NavigationBar } from '../components/NavigationBar'

export function Inbox ({toggleDarkMode})  {
  return (
    <>
      <header className='bg-red-500'>
        <ul className="flex justify-between px-4 py-2 bg-white dark:bg-neutral-800">
          <li className='font-bold text-xl text-black dark:text-white'>
            <p className='font-bold'>Messages</p>
          </li>
          <li><p className="p-2"></p></li>
          <li>
            <ul className='w-42'>
              <li className='relative group/dropdown'>
                <label className='flex justify-end'>
                  <i className="bx bx-dots-vertical-rounded text-3xl cursor-pointer"></i>
                  <input type="checkbox" className='hidden'/>
                </label>
                <ul className='absolute right-0 opacity-0 pointer-events-none group-has-checked/dropdown:opacity-100 group-has-checked/dropdown:pointer-events-auto top-[calc(100%+11px)] bg-white dark:bg-neutral-900 rounded-2xl w-full p-4 shadow-2xl flex flex-col gap-3 transition-all duration-300'>
                  <li className='flex items-center gap-2 cursor-pointer text-black dark:text-white'><i className='bx bx-run'></i><span>Log out</span></li>
                  <li className='flex items-center gap-2 cursor-pointer text-black dark:text-white'><i className='bx bx-street-view'></i><span>Profile</span></li>
                  <li className='flex items-center gap-2 cursor-pointer text-black dark:text-white'><i className='bx bx-lock'></i><span>Privacy</span></li>
                  <li className='flex items-center gap-2 cursor-pointer text-black dark:text-white' onClick={toggleDarkMode}><i className='bx bx-moon'></i><span>Dark mode</span></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    
      <main className="bg-white dark:bg-neutral-900 w-full flex flex-col gap-5 mb-15">
        <div className="bg-white dark:bg-neutral-800 flex justify-center px-4">
          <input type="text" name="" id="" placeholder="Search for people" className="bg-gray-100 dark:bg-neutral-700 text-black dark:text-white p-2 rounded-2xl w-full outline-0"/>
        </div>
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