import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore';
import { Loader } from 'lucide-react';
import BecomeEducatorPage from './pages/user/BecomeEducatorPage';
import ProfilePage from './pages/user/ProfilePage';

import DashboardPage from './pages/educator/DashboardPage';
import AddCoursePage from './pages/educator/AddCoursePage';
import MyCoursePage from './pages/educator/MyCoursePage';
import StudentEnrolledPage from './pages/educator/StudentEnrolledPage';
import EducatoreSideBar from './pages/educator/EducatoreSideBar';
import EducatorLayout from './pages/educator/EducatorLayout';
import CoursePlayerPage from './pages/player/CoursePlayerPage';
import MyEnrollmentPage from './pages/user/MyEnrollmentPage';
import CoursePage from './pages/user/CoursePage';
import PurchasePage from './pages/user/PurchasePage';
import { useUserStore } from './store/useUserStore';

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const { requestStatus, instructorRequest } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []);


  useEffect(() => {
    if (authUser && authUser.isApplyForInstructor) {
      requestStatus();
    }
  }, [authUser]);



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
    <div className='bg-slate-200'>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/become-educator' element={authUser ? authUser?.isApplyForInstructor?<Navigate to={"/educator/dashboard"}/>:<BecomeEducatorPage /> : <Navigate to={'/login'} />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={'/login'} />} />
        <Route path='/educator' element={authUser ? <ProfilePage /> : <Navigate to={'/login'} />} />
        <Route path='/player/:courseId' element={authUser ? <CoursePlayerPage /> : <Navigate to={'/login'} />} />
        <Route path='/my-enrollments' element={authUser ? <MyEnrollmentPage /> : <Navigate to={'/login'} />} />
        <Route path='/purchase' element={authUser ? <PurchasePage /> : <Navigate to={'/login'} />} />
        <Route path='/all-courses' element={<CoursePage />} />


        <Route path="/educator" element={(authUser?.role === 'instructor' || instructorRequest) ? <EducatorLayout /> : <Navigate to="/" />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="add-course" element={<AddCoursePage />} />
          <Route path="my-courses" element={<MyCoursePage />} />
          <Route path="students-enrolled" element={<StudentEnrolledPage />} />
        </Route>

      </Routes>

      <Footer />
    </div>
  )
}

export default App