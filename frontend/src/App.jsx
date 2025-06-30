import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={HomePage} />
        <Route path='/signup' element={HomePage} />
        <Route path='/login' element={HomePage} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App