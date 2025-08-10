import React, { useState } from 'react'
import course1 from '../../assets/course_1.png';
import { dummyCourses } from '../../assets/assets'
import { Link} from 'react-router-dom';
import { Line } from 'rc-progress';
import { useUserStore } from '../../store/useUserStore';
import { useEffect } from 'react';


const MyEnrollementPage = () => {
  const {  enrolledCourse,isEnrolling,getEnrolledCourse} = useUserStore();
  
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 1, totalLecture: 2 },
    { lectureCompleted: 1, totalLecture: 1 }
  ])

  useEffect(()=>{
    getEnrolledCourse();
  },[getEnrolledCourse])
  
  return (
    <div className=' px-[130px] py-16'>
      <h1 className='text-3xl font-bold'>My course</h1>

      <div className='w-full bg-white shadow rounded-md border-b border-zinc-500'>

        <div className=' flex items-center justify-between p-4 mt-6 border-b border-zinc-500'>
          <h1 className=' font-semibold basis-[46%] '>All courses</h1>
          <h1 className=' font-semibold  '>Completed</h1>
          <h1 className=' font-semibold mr-6'>Enrolled on</h1>
          <h1 className=' font-semibold basis-[10%]'>Status</h1>
        </div>


        {
          enrolledCourse?.map((enroll, index) => (
            <div key={enroll.course._id} className='flex items-center justify-between p-4 border-b border-zinc-500'>

              <Link to={`/player/${enroll.course._id}`} className='flex basis-[46%] cursor-pointer gap-2 w-full'>
                <img src={enroll?.course?.thumbnail} alt="" className='w-24 ' />
                <div className='flex-1 flex flex-col '>
                  <h1>{enroll?.course.title}</h1>
                  <Line strokeWidth={2} percent={
                      (enroll?.progress?.completedLectures?.length* 100) / (enroll?.course?.content?.length) || 0
                  } className='bg-gray-300 rounded-full' />
                </div>

              </Link>

              <div>
                  {`${enroll?.progress?.completedLectures?.length}/${enroll?.course?.content?.length}`  || 0}
              </div>
              <div>{new Date(enroll.enrolledAt).toLocaleDateString('en-IN',{
                day:'2-digit',
                month:'short',
                year:'numeric'
              })}</div>

              <Link to={`/player/${enroll.course._id}`} 
              className={`btn basis-[10%]  
              ${(enroll?.progress?.completedLectures?.length)/(enroll?.course?.content?.length) == 1
                ?" bg-green-600 text-white "
                :"btn-primary"
              }`}
              >
                
                {(enroll?.progress?.completedLectures?.length)/(enroll?.course?.content?.length) == 1
                  ? "Completed" : "Ongoing"
                }
              </Link>
            </div>
          ))
        }



      </div>
    </div>
  )
}

export default MyEnrollementPage