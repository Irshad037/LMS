import React from 'react'
import { IoIosSearch } from "react-icons/io";
import walmart_logo from '../assets/walmart_logo.svg'
import paypal_logo from '../assets/paypal_logo.svg'
import microsoft_logo from '../assets/microsoft_logo.svg'
import adobe_logo from '../assets/adobe_logo.svg'
import accenture_logo from '../assets/accenture_logo.svg'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { dummyCourses } from '../assets/assets'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center p-[130px] gap-5'>

      <h1 className='text-5xl font-bold leading-snug text-center'>
        Empower your future with the course  <br />design to <span className='text-blue-600'>fit your choice
        </span>
      </h1>

      <p className="text-center text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
        We bring together world-class instructors, interactive content, and a supportive community
        to help you achieve your personal and professional goals.
      </p>

      <div className='flex bg-white rounded-md w-[576px] items-center justify-center p-1 pl-4 text-zinc-600'>
        <IoIosSearch size={26} />
        <input type="text" className='flex-1 outline-none border-none bg-transparent text-xl' />
        <button className='btn btn-primary w-28 h-14 text-xl px-20'>Search</button>
      </div>

      <div className='flex flex-col w-full my-20'>
        <p className="text-center text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
          Trust by learners from
        </p>
        <div className='flex items-center justify-center mt-7 gap-11'>
          <img src={microsoft_logo} alt="" className='w-38' />
          <img src={walmart_logo} alt="" className='w-38' />
          <img src={accenture_logo} alt="" className='w-38' />
          <img src={adobe_logo} alt="" className='w-38' />
          <img src={paypal_logo} alt="" className='w-38' />

        </div>
      </div>

      <h1 className='text-3xl font-semibold leading-snug '>Learn from the best</h1>
      <p className="text-center text-gray-500 text-base leading-relaxed ">
        Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
      </p>

      <div className='flex items-center justify-center gap-5 w-full my-14'>
        {dummyCourses.slice(0, 4).map((course, index) => (
          <Link to={'/purchase'} key={index} className='cursor-pointer flex shadow-xl items-center justify-center  flex-col bg-white w-[300px] h-[290px]   rounded-md'>
            <div className='flex-1 w-full'>
              <img src={course.thumbnail} alt="" className='rounded-t-md h-[160px] w-full' />
            </div>
            <div className='flex-1 w-full p-2'>
              <h1 className='text-base font-bold'>{course.title}</h1>
              <p className='text-gray-500 text-base leading-relaxed '>{course.instructor}</p>

              <div className='flex items-center gap-1 text-yellow-500 cursor-pointer'>
                <p className='text-black mr-1'>{course.averageRating}</p>
                {Array.from({ length: 5 }, (_, i) => {
                  const value = i + 1;
                  if (course.averageRating >= value) return <FaStar key={i} size={12} />
                  else if (course.averageRating >= value - 0.5) return <FaStarHalfAlt key={i} size={13} />
                  else return <FaRegStar key={i} size={14} />
                })}
              </div>

              <p>${course.coursePrice}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link to={'/all-courses'} className='btn px-12 h-11 btn-outline text-base text-zinc-500'>Show All Courses</Link>
    </div>
  )
}

export default HomePage