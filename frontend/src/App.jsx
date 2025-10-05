import { Login } from './pages/Login'
import { Register } from './pages/Register'
import {Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
