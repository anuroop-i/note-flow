import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SIgnUp/SignUp'
import Login from './pages/Login/Login'

const router = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<SignUp />} />
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {router}
    </div>
  )
}

export default App