import React from 'react'
import { Link } from 'react-router-dom';
import { useCourseStore } from '../../store/useCourseStore';
import { useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MyCoursePage = () => {

  const { getMyCreatedCourse, myCreatedCourse, deleteCourse, deletingCourseId } = useCourseStore();
  useEffect(() => {
    getMyCreatedCourse();
  }, [])

  return (
    <div className=' p-6'>
      <h1 className='text-3xl font-bold'>My course</h1>

      <div className='w-full bg-white shadow rounded-md border-b border-zinc-500'>

        <div className=' flex items-center justify-between p-4 mt-6 border-b border-zinc-500'>
          <h1 className=' font-semibold basis-[40%] '>All courses</h1>
          <h1 className=' font-semibold basis-[15%]'>Student</h1>
          <h1 className=' font-semibold basis-[15%]'>Rating</h1>
          <h1 className=' font-semibold basis-[15%]'>Published on</h1>
          <h1 className=' font-semibold basis-[15%]'>Action</h1>
        </div>


        {
          myCreatedCourse?.map((course, idx) => (
            <div key={idx} className='flex items-center justify-between p-4 border-b border-zinc-500'>

              <Link to={`/player/${course._id}`} className=' flex items-center gap-2 basis-[40%] cursor-pointer'>
                <img src={course.thumbnail} alt="" className='w-24 ' />
                <h1>{course.title}</h1>
              </Link>

              <div className='basis-[15%]'>{course.enrolledStudents.length}</div>
              <div className='basis-[15%]'>{course.averageRating}</div>
              <div className='basis-[15%]'>
                {new Date(course.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })}
              </div>

              <button className='btn bg-red-800 text-white basis-[15%]'
                onClick={async () => {
                  const confirmDelete = window.confirm("Are you sure you want to delete this course?");
                  if (confirmDelete) {
                    await deleteCourse(course._id)
                  }
                }}

                disabled={deletingCourseId === course._id}
              >
                
                {deletingCourseId === course._id ? (<><LoadingSpinner size={16} />Deleting...  </>) : ( "Delete")}
          
              </button>
            </div>
          ))
        }



      </div>
    </div>
  )
}

export default MyCoursePage
