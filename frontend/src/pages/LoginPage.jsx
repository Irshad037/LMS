import React from 'react'
import { MdOutlineMail, MdPassword } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'


const LoginPage = () => {
  return (
    <div className='max-w-screen-xl mx-auto flex  h-screen px-10 gap-8'>
      <div className="flex-1 hidden lg:flex items-center  justify-center ">
        <img src="/study.png" className='w-[450px]' />
      </div>

      <form className='flex-1 flex  sm:items-center md:items-center flex-col justify-center gap-4'>

        <h1 className='text-4xl font-extrabold flex-col'>Let go.</h1>
        <label className='w-[300px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdOutlineMail className='w-[25px]' />
          <input
            type="email" placeholder='Email' className='flex-1 cursor-pointer font-medium border-none outline-none'
          />
        </label>


        <label className='w-[300px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdPassword className='w-[25px]' />
          <input
            type="password" placeholder='Password' className='flex-1 cursor-pointer font-medium border-none outline-none'
          />
        </label>

        <div className="flex flex-col gap-1 w-[300px]">
          <div className='flex justify-end'>
            <Link to="/forgot-password">
              <p className="text-md font-medium text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
              </p>
            </Link>
          </div>

          <button className="btn btn-primary w-full rounded-full text-white">
            Sign in
          </button>

        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-lg font-semibold'>Don't have an account?</p>
          <Link to='/signup'>
            <button className='btn rounded-full border-blue-700 hover:btn-primary w-[300px] '>Signup</button>
          </Link>
        </div>

      </form>
    </div>
  )
}

export default LoginPage