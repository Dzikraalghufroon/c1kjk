import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './page/sign/sign';
import LoginForm from './page/sign/login';
// import Navbar from './assets/sidebar/sidebar';
import Navbar from './assets/sidebar/navbar';
import Profile from './assets/profile/profile';
import Account from './page/profile/account';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />} />
          <Route path='/sign' element={<RegistrationForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/profile' element={<Account />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
