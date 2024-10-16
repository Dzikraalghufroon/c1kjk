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
import Search from './page/search/search';
import Upload from './page/Upload/upload';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />} />
          <Route path='/sign' element={<RegistrationForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/profile' element={<Account />} />
          <Route path='/profile/upload' element={<Upload />} />
          <Route path='/result' element={<Search />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
