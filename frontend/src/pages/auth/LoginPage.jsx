import React, { useState } from 'react'
import { MdOutlineMail, MdPassword } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore';
import { Eye, EyeClosed, Loader2, } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    console.log(formData);
    
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='max-w-screen-xl mx-auto flex  h-screen px-12 '>
      <div className="flex-1 hidden lg:flex items-center  justify-center ">
        <img src="/study.png" className='w-[450px]' />
      </div>

      <form onSubmit={handleSubmit} className='flex-1 flex flex-col justify-center gap-4 '>

        <h1 className='text-4xl font-extrabold flex-col'>Let go.</h1>
        <label className='w-[300px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdOutlineMail className='w-[25px]' />
          <input
            type="email" placeholder='Email' className='flex-1 bg-transparent font-medium border-none outline-none'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>


        <label className='w-[300px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdPassword className='w-[25px]' />
          <input
            type={showPassword?"text":"password"} placeholder='Password' className='flex-1 bg-transparent font-medium border-none outline-none'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          {showPassword ?
            <Eye onClick={() => setShowPassword(!showPassword)} />
            : <EyeClosed onClick={() => setShowPassword(!showPassword)}
          />}
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
            {isLoggingIn ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) :
            (
              "Login"
            )
          }
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