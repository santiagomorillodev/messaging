import { Routes, Route } from 'react-router-dom'
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

function App() {
  // 🌙 Recuperar el estado guardado o por defecto false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  // 🌀 Sincronizar el modo con <html> y localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
    console.log(darkMode)
  }

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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
