import React from 'react'
import useAuthStore from '../../store/useAuthStore'
import { dummyCourses } from '../../assets/assets'
import { useUserStore } from '../../store/useUserStore'
import appointments_icon from '../../assets/appointments_icon.svg'
import patients_icon from '../../assets/patients_icon.svg'
import earning_icon from '../../assets/earning_icon.svg'
import user_icon from '../../assets/user_icon.svg';
import { useCourseStore } from '../../store/useCourseStore'
import { useEffect } from 'react'

const DashboardPage = () => {
  const { authUser } = useAuthStore();
  const { instructorRequest, deleteRequest } = useUserStore();
  const { getNoOfStudentEnrolled, enrolledStudents, getMyCreatedCourse, myCreatedCourse } = useCourseStore();

  useEffect(() => {
    if(authUser?.role ==="instructor"){
    getNoOfStudentEnrolled();
    getMyCreatedCourse();}
  }, [])

  return (
    <div className=' flex flex-col py-[100px] px-[130px]'>

      {authUser.role === 'instructor' &&
        <>
          <div className='flex items-center  justify-center gap-4 text-zinc-600'>

            <div className='flex items-center p-5 w-60 bg-white border border-blue-200 shadow-xl rounded-md gap-2'>
              <img src={patients_icon} alt="person" />
              <div >
                <p className='text-xl font-bold text-center'>{enrolledStudents?.length || 0}</p>
                <p>Total Enrollments</p>
              </div>
            </div>

            <div className='flex items-center p-5 w-60 bg-white border border-blue-200 shadow-xl rounded-md gap-2'>
              <img src={appointments_icon} alt="person" />
              <div >
                <p className='text-xl font-bold text-center'>{myCreatedCourse?.length || 0}</p>
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


          <div className='flex flex-col pt-[80px] mb-20 w-full'>
            <h1 className='text-3xl font-bold'>Latest Enrollments</h1>

            <div className='bg-white  border border-zinc-400 rounded-md shadow-xl m-6 mt-6 '>
              <div className=' flex items-center justify-between p-4 border-b border-zinc-400 w-full font-extrabold text-xl'>
                <h1 className=' font-semibold px-1'>#</h1>
                <h1 className=' font-semibold basis-[45%]  '>Student name</h1>
                <h1 className=' font-semibold basis-[45%]'>Course Title</h1>
              </div>



              {
                enrolledStudents.slice(0, 2).map((student, idx) => (
                  <div key={idx} className='flex items-center justify-between p-4 border-b border-zinc-500'>

                    <p className='p-1'>{idx + 1}</p>
                    <div className='flex items-center gap-3 basis-[45%]'>
                      <img src={student?.avatar || patients_icon} alt="profileImg" className='w-12 shadow-md border border-zinc-300 rounded-full border' />
                      <h1>{student.studentName}</h1>
                    </div>

                    <div className='basis-[45%]'>{student.courseTitle}</div>
                  </div>
                ))
              }
            </div>

          </div>
        </>
      }

      {
        instructorRequest &&
        <div className="  p-6 bg-white  rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Instructor Request Status</h1>

          <div className="flex items-center justify-between gap-4 mb-4 bg-slate-200 px-6 py-3 rounded-md">
            <div className='flex items-center gap-3'>

              <div className="bg-zinc-700 w-[60px] h-[60px] rounded-full flex items-center justify-center">
                <img
                  src={authUser.profileImg || user_icon}
                  alt="User"
                  className="w-[57px] h-[57px] object-cover bg-white rounded-full cursor-pointer"
                />
              </div>
              <div>
                <p className="font-bold text-xl">{authUser.name}</p>
                <p className="text-gray-500 text-base">{authUser.email}</p>
              </div>
            </div>


            <div className=" p-4 flex items-center gap-5">
              <div className='flex items-center gap-1'>
                <p className="font-semibold text-lg">Status:
                  {instructorRequest && (
                    <span
                      className={`capitalize ${instructorRequest.status === "pending"
                        ? "text-blue-600"
                        : instructorRequest.status === "rejected"
                          ? "text-red-600"
                          : "text-green-500"
                        }`}
                    >
                      {instructorRequest.status.replace(/^\w/, c => c.toUpperCase())}
                    </span>
                  )}
                </p>
                | <p className="text-sm  text-gray-600">Submitted on: {new Date(instructorRequest?.createdAt).toLocaleDateString(
                  'en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                }
                )}</p>
              </div>

              {
                instructorRequest?.status == "pending" &&
                <button className='btn text-lg px-8 bg-red-700 text-white'
                  onClick={() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
                    if (confirmDelete) {
                      deleteRequest({ requestId: instructorRequest._id });
                    }
                  }}
                >
                  Delete Request
                </button>
              }

            </div>
          </div>


        </div>

      }

    </div>
  )
}

export default DashboardPage