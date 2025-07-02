import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full flex items-center md:justify-center lg:justify-between  px-[130px] border-b-[1px] border-stone-700'>
      <Link to="/" className='flex items-center justify-center gap-1'>
        <img src="/study.png" className='w-[55px]' />
        <h1 className='text-2xl font-extrabold'>Learnify</h1>
      </Link>
      <div className='hidden lg:flex items-center justify-center gap-[30px] '>
        <Link className='text-[16px] link link-hover  text-neutral-600 font-normal '>Become Educatore </Link>
        | <Link className='text-[16px] link link-hover text-neutral-600 font-normal '>My Enrollments </Link>
        | <Link to="/login" className='text-[16px] link link-hover text-neutral-600 font-normal '>Login</Link>
        <button className="btn btn-primary rounded-md" onClick={()=>navigate("/signup")}>Create Account</button>
      </div>
    </div>

  )
}

export default Navbar