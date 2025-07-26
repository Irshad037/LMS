import React, { useState } from 'react'
import course1 from '../../assets/course_1.png';
import { dummyCourses } from '../../assets/assets'
import { Link} from 'react-router-dom';
import { Line } from 'rc-progress';


const MyEnrollementPage = () => {
  
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 1, totalLecture: 2 },
    { lectureCompleted: 1, totalLecture: 1 }
  ])
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
          dummyCourses.map((course, index) => (
            <div className='flex items-center justify-between p-4 border-b border-zinc-500'>

              <Link to={`/player/${course._id}`} className='flex basis-[46%] cursor-pointer gap-2 w-full'>
                <img src={course.thumbnail} alt="" className='w-24 ' />
                <div className='flex-1 flex flex-col '>
                  <h1>{course.title}</h1>
                  <Line strokeWidth={2} percent={
                    progressArray[index]
                      ? (progressArray[index].lectureCompleted * 100) / (progressArray[index].totalLecture)
                      : 0
                  } className='bg-gray-300 rounded-full' />
                </div>

              </Link>

              <div>
                {
                  progressArray[index] &&
                  `${progressArray[index].lectureCompleted}/${progressArray[index].totalLecture}`
                }
              </div>
              <div>22/5/2025</div>

              <Link to={`/player/${course._id}`} 
              className={`btn basis-[10%]  
              ${progressArray[index] &&progressArray[index].lectureCompleted / progressArray[index].totalLecture == 1
                ?" bg-green-600 text-white "
                :"btn-primary"
              }`}
              >
                
                {progressArray[index] &&
                  progressArray[index].lectureCompleted / progressArray[index].totalLecture == 1
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