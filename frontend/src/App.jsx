import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={HomePage} />
        <Route path='/signup' element={SignUpPage} />
        <Route path='/login' element={LoginPage} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App