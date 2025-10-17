import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Inbox } from './pages/Inbox'
import { Settings } from './pages/Settings'
import { Chat } from './pages/Chat'
import { Profile } from './pages/Profile'
import { Status } from './pages/Status.jsx'
import { Bell } from './pages/Bell.jsx'
import NotFound from './pages/NotFound.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import Likes from './pages/Likes.jsx'
import UpdatePassword from './pages/UpdatePassword.jsx'
import UpdateEmail from './pages/UpdateEmail.jsx'
import DesktopLayout from './pages/Desktop.jsx'
import { DesktopViewProvider } from './context/DesktopViewContext.jsx'


function App() {
  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && !window.location.pathname.startsWith('/desktop')) {
        navigate('/desktop')
      } else if (window.innerWidth <= 768 && window.location.pathname.startsWith('/desktop')) {
        navigate('/')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [navigate])

  return (
    <main className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen transition-colors">
      <Routes>
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Inbox toggleDarkMode={toggleDarkMode} />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/direct' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/status' element={<Status />} />
        <Route path='/notification' element={<Bell />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/likes' element={<Likes />} />
        <Route path='/update/password' element={<UpdatePassword />} />
        <Route path='/update/email' element={<UpdateEmail />} />

        <Route path='/desktop/*' element={<DesktopViewProvider><DesktopLayout /></DesktopViewProvider>}>
          <Route index element={<Inbox />} />
          <Route path='chat/:id' element={<Chat />} />
          <Route path='profile/:username' element={<Profile />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='notification' element={<Bell />} />
          <Route path='status' element={<Status />} />
        </Route>


        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
