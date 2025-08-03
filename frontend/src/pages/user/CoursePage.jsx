import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { useEffect } from 'react'
import { useCourseStore } from '../../store/useCourseStore'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const CoursePage = () => {
  const { AllCourses, getAllCourses, isGettingAllCourses } = useCourseStore();
  const TotalStar = 5;

  useEffect(() => {
    getAllCourses();
  }, [])

  if (isGettingAllCourses) {
    return (
        <div className='w-full h-screen flex items-center justify-center '>
          <LoadingSpinner size="lg" />
        </div>
    )
  }

  return (
    <div className=' px-[130px] py-[80px] flex flex-col' >
      <div className='flex items-center justify-between w-full'>
        <div>
          <h1 className='text-3xl font-bold'>Course List</h1>
          <div className='flex items-center'>
            <Link to={'/'} className='text-blue-600 font-semibold'>Home</Link>/
            <p className='text-zinc-600'>Course List</p>
          </div>
        </div>

        <div className='w-[600px] bg-white rounded-md flex items-center justify-between pl-4'>
          <IoIosSearch size={26} />
          <input type="text" className='flex-1 p-4 rounded-md outline-none' placeholder='Search for course' />
          <button className='btn btn-primary px-16 py-6 text-xl'> Search</button>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 items-center my-14 '>
        {AllCourses.map((course, index) => (
          <Link to={`/purchase/${course._id}`} key={index} className=' 
            cursor-pointer flex shadow-xl items-center justify-center hover:-translate-y-6 hover:shadow-zinc-800 hover:border-2 transition-all duration-300 flex-col bg-white w-[300px] h-[290px]   rounded-md'
          >
            <div className='flex-1 w-full'>
              <img src={course.thumbnail} alt="" className='rounded-t-md w-full h-[160px]' />
            </div>
            <div className='flex-1 w-full p-2'>
              <h1 className='text-base font-bold'>{course.title}</h1>
              <p className='text-gray-500 text-base leading-relaxed '>{course?.instructor?.name || "unknown user"}</p>

              <div className='flex items-center gap-1 text-yellow-500 cursor-pointer'>
                <p className='text-black mr-1'>{course.averageRating}</p>
                {Array.from({ length: TotalStar }, (_, i) => {
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


    </div>
  )
}

export default CoursePage