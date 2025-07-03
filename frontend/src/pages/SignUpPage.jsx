import { useState } from 'react'
import { MdOutlineMail, MdPassword } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeClosed, Loader2, } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    console.log(formData);
    
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (

    <div className='max-w-screen-xl mx-auto flex h-screen px-12'>
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <img src="/study.png" className='w-[450px]' />
      </div>

      <form onSubmit={handleSubmit} className='flex-1 flex flex-col justify-center gap-4 '>

        <h1 className='text-4xl font-extrabold flex-col'>Join today.</h1>


        <label className='w-[350px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <FaUser className='w-[25px]' />
          <input
            type="text" placeholder='Name' className='flex-1 text-stone-800 font-medium border-none outline-none'
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className='w-[350px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdOutlineMail className='w-[25px]' />
          <input
            type="email" placeholder='Email' className='flex-1 text-stone-800 font-medium border-none outline-none'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className='w-[350px] h-[45px] p-2 gap-1 border-2 flex items-center justify-between border-black rounded-[7px]'>
          <MdPassword className='w-[25px]' />
          <input
            type={showPassword ? "text" : "password"} placeholder='Password' className='flex-1  font-medium border-none outline-none'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          {showPassword ?
            <Eye onClick={() => setShowPassword(!showPassword)} />
            : <EyeClosed onClick={() => setShowPassword(!showPassword)}
          />}
        </label>

        <button className='btn btn-primary w-[350px]  rounded-full text-white' disabled={isSigningUp}>
          {isSigningUp ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) :
            (
              "Create Account"
            )
          }

        </button>
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