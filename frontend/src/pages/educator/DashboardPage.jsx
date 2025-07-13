import React from 'react'
import appointments_icon from '../../assets/appointments_icon.svg'
import patients_icon from '../../assets/patients_icon.svg'
import earning_icon from '../../assets/earning_icon.svg'
import { dummyCourses } from '../../assets/assets'
import profile_img_1 from '../../assets/profile_img_1.png'

const DashboardPage = () => {
  return (
    <div className=' flex flex-col py-[100px]'>
      <div className='flex items-center px-[130px] gap-4 text-zinc-600'>

        <div className='flex items-center p-5 w-60 bg-white border border-blue-200 shadow-xl rounded-md gap-2'>
          <img src={patients_icon} alt="person" />
          <div >
            <p className='text-xl font-bold text-center'>2</p>
            <p>Total Enrollments</p>
          </div>
        </div>

        <div className='flex items-center p-5 w-60 bg-white border border-blue-200 shadow-xl rounded-md gap-2'>
          <img src={appointments_icon} alt="person" />
          <div >
            <p className='text-xl font-bold text-center'>2</p>
            <p>Total Courses</p>
          </div>
        </div>

        <div className='flex items-center p-5 w-60 bg-white border border-blue-200 shadow-xl rounded-md gap-2'>
          <img src={earning_icon} alt="person" />
          <div >
            <p className='text-xl font-bold text-center'>2</p>
            <p>Total Earnings</p>
          </div>
        </div>

      </div>


      <div className='flex flex-col p-[130px]'>
        <h1 className='text-3xl font-bold'>Latest Enrollments</h1>

        <div className='bg-white w-[720px] border border-zinc-400 rounded-md shadow-xl m-6 mt-6 '>
          <div className=' flex items-center justify-between p-4 border-b border-zinc-400 w-full font-extrabold text-xl'>
            <h1 className=' font-semibold '>#</h1>
            <h1 className=' font-semibold basis-[45%]  '>Student name</h1>
            <h1 className=' font-semibold basis-[45%]'>Course Title</h1>
          </div>

          {
            dummyCourses.slice(0,2).map((course, idx) => (
              <div key={idx} className='flex items-center justify-between p-2 mt-6 border-b border-zinc-500'>

                <p className=''>{idx + 1}</p>
                <div className='flex items-center gap-3 basis-[45%]'>
                  <img src={profile_img_1} alt="" className='w-12 rounded-full' />
                  <h1>student{idx+1}</h1>
                </div>

                <div className='basis-[45%]'>{course.title}</div>
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default DashboardPage