import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore';
import { LogOut } from 'lucide-react';
import user_icon from '../assets/user_icon.svg';


const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  return (
    <div className='w-full flex items-center md:justify-center lg:justify-between  px-[130px] border-b-[1px] border-stone-700'>
      <Link to="/" className='flex items-center justify-center gap-1'>
        <img src="/study.png" className='w-[70px]' />
        <h1 className='text-3xl font-extrabold'>Learnify</h1>
      </Link>
      <div className='hidden lg:flex items-center justify-center gap-[30px] '>

        {authUser && (
          <>
            {authUser.role != "instructor" && (
              <>
                <Link to={'/become-educator'} className='text-[18px] link link-hover text-neutral-600 font-normal'>
                 Become Educator
                </Link>
                |
              </>
            )}

            {authUser.role == "instructor" && (
              <>
                <Link to="/my-courses" className="text-[18px] link link-hover text-neutral-600 font-normal">
                 Educator Dashboard 
                </Link>

                |
              </>
            )}

            <Link className='text-[18px] link link-hover text-neutral-600 font-normal'>
              My Enrollments
            </Link>

            <Link to="/profile" className="bg-zinc-700 w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <img
                src={authUser?.profileImg || user_icon}
                alt="User"
                className="w-12 h-12 object-cover rounded-full cursor-pointer"
              />
            </Link>

            <button className="btn btn-primary rounded-md" onClick={() => logout()}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>




          </>
        )}

        {!authUser &&
          <>
            <Link to="/login" className='text-[16px] link link-hover text-neutral-600 font-normal '>
              Login
            </Link>
            <button className="btn btn-primary rounded-md" onClick={() => navigate("/signup")}>
              Create Account
            </button>
          </>
        }
      </div>
    </div>

  )
}

export default Navbar