import React from 'react'
import { MdOutlineMail, MdPassword } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (

    <div className='max-w-screen-xl mx-auto flex h-screen px-10 gap-12'>
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <img src="/study.png" className='w-[450px]' />
      </div>

      <form className='flex-1 flex flex-col justify-center gap-4 sm:items-center md:items-center'>

        <h1 className='text-4xl font-extrabold flex-col'>Join today.</h1>
        <label className='w-[350px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <FaUser className='w-[25px]' />
          <input
            type="text" placeholder='Name' className='flex-1 cursor-pointer font-medium border-none outline-none'
          />
        </label>

        <label className='w-[350px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdOutlineMail className='w-[25px]' />
          <input
            type="email" placeholder='Email' className='flex-1 cursor-pointer font-medium border-none outline-none'
          />
        </label>

        <label className='w-[350px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdPassword className='w-[25px]' />
          <input
            type="password" placeholder='Password' className='flex-1 cursor-pointer font-medium border-none outline-none'
          />
        </label>

        <button className='btn btn-primary w-[350px]  rounded-full text-white'>Signup</button>
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-semibold'>Already have an account?</p>
          <Link to='/login'>
            <button className='btn rounded-full border-blue-700 hover:btn-primary w-[350px] '>Sign in</button>
          </Link>
        </div>

      </form>
    </div>
  )
}

export default SignUpPage;