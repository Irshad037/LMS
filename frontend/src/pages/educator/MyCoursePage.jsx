import React from 'react'
import course1 from '../../assets/course_1.png';
import { dummyCourses } from '../../assets/assets'
import { Link } from 'react-router-dom';

const MyCoursePage = () => {
  return (
    <div className=' p-6'>
      <h1 className='text-3xl font-bold'>My course</h1>

      <div className='w-full bg-white shadow rounded-md border-b border-zinc-500'>

        <div className=' flex items-center justify-between p-4 mt-6 border-b border-zinc-500'>
          <h1 className=' font-semibold basis-[30%] '>All courses</h1>
          <h1 className=' font-semibold '>Student</h1>
          <h1 className=' font-semibold '>Rating</h1>
          <h1 className=' font-semibold '>Published on</h1>
          <h1 className=' font-semibold '>Action</h1>
        </div>


        {
          dummyCourses.map((course) => (
            <div className='flex items-center justify-between p-4 mt-6 border-b border-zinc-500'>
              
              <Link to={`/player/${course._id}`} className='flex basis-[30%] cursor-pointer'>
                <img src={course1} alt="" className='w-24 ' />
                <h1>{course.title}</h1>
              </Link>

              <div>2</div>
              <div>4.5</div>
              <div>22/5/2025</div>

              <button className='btn bg-red-800 text-white'>Delete</button>
            </div>
          ))
        }



      </div>
    </div>
  )
}

export default MyCoursePage
