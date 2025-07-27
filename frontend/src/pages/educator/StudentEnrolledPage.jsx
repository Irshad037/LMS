import React from 'react'
import user_icon from '../../assets/user_icon.svg'
import patients_icon from '../../assets/patients_icon.svg'
import { useCourseStore } from '../../store/useCourseStore';
import { useEffect } from 'react';

const StudentEnrolledPage = () => {
  const { getNoOfStudentEnrolled, enrolledStudents } = useCourseStore();

  useEffect(() => {
    getNoOfStudentEnrolled();
    console.log(enrolledStudents);

  }, [])

  return (
    <div className=' p-[70px]'>
      <div className='w-full bg-white shadow rounded-md border-b border-zinc-500'>

        <div className=' flex items-center justify-between p-4 mt-6 border-b border-zinc-500'>
          <h1 className=' font-semibold basis-[5%]  '>#</h1>
          <h1 className=' font-semibold flex basis-[35%] '>Student Name</h1>
          <h1 className=' font-semibold basis-[20%] '>Student email</h1>
          <h1 className=' font-semibold basis-[25%] '>Course name</h1>
          <h1 className=' font-semibold basis-[15%]'>Date</h1>
        </div>

        {enrolledStudents?.length === 0 && (
          <p className="text-center text-gray-500 italic my-4">
            No students enrolled yet.
          </p>
        )}

        {
          enrolledStudents.map((student, idx) => (
            <div key={idx} className='flex items-center justify-between p-4 border-b border-zinc-500'>

              <p className='basis-[5%]'>{idx + 1}</p>
              <div className='flex items-center gap-3 basis-[35%]'>
                <img src={student?.avatar || patients_icon} alt="" className='w-12 shadow-md border border-zinc-300  rounded-full' />
                <h1>{student.studentName}</h1>
              </div>

              <div className='basis-[20%]'>{student.studentEmail}</div>
              <div className='basis-[25%]'>{student.courseTitle}</div>
              <div className='basis-[15%]'>  {new Date(student.enrolledDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</div>
            </div>
          ))
        }



      </div>
    </div>
  )
}


export default StudentEnrolledPage
