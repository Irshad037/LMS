import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore';
import { Loader } from 'lucide-react';
import BecomeEducatorPage from './pages/user/BecomeEducatorPage';

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  useEffect(() => {
    if (authUser !== null) {
      console.log("✅ Auth user:", authUser);
    }
  }, [authUser]);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/become-educator' element={authUser ? <BecomeEducatorPage /> : <Navigate to={'/login'} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App