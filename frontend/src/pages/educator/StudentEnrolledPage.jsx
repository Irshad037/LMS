import React from 'react'
import profile_img_1 from '../../assets/profile_img_1.png'
import course1 from '../../assets/course_1.png';
import { dummyCourses } from '../../assets/assets'

const StudentEnrolledPage = () => {
  return (
    <div className=' p-6'>
      <div className='w-full bg-white shadow rounded-md border-b border-zinc-500'>

        <div className=' flex items-center justify-between p-4 mt-6 border-b border-zinc-500'>
          <h1 className=' font-semibold basis-[5%]  '>#</h1>
          <h1 className=' font-semibold flex basis-[30%] '>Student Name</h1>
          <h1 className=' font-semibold basis-[31%] '>Student email</h1>
          <h1 className=' font-semibold basis-[31%]'>Date</h1>
        </div>


        {
          dummyCourses.map((course,idx) => (
            <div key={idx} className='flex items-center justify-between p-4 mt-6 border-b border-zinc-500'>

              <p className='basis-[5%]'>{idx+1}</p>
              <div className='flex items-center gap-3 basis-[31%]'>
                <img src={profile_img_1} alt="" className='w-12 rounded-full' />
                <h1>{course.title}</h1>
              </div>

              <div  className='basis-[31%]'>example@gmail.com</div>
              <div className='basis-[31%]'>22/5/2025</div>
            </div>
          ))
        }



      </div>
    </div>
  )
}


export default StudentEnrolledPage
