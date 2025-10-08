import {Routes, Route, Link} from 'react-router-dom'
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
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Inbox/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/direct' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/status' element={<Status/>}/>
        <Route path='/notification' element={<Bell/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
