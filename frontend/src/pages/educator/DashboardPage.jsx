import React from 'react'
import appointments_icon from '../../assets/appointments_icon.svg'
import patients_icon from '../../assets/patients_icon.svg'
import earning_icon from '../../assets/earning_icon.svg'
import { dummyCourses } from '../../assets/assets'
import profile_img_1 from '../../assets/profile_img_1.png'
import { useUserStore } from '../../store/useUserStore'
import useAuthStore from '../../store/useAuthStore'

const DashboardPage = () => {
  const { authUser } = useAuthStore();
  const { requestStatus, instructorRequest, deleteRequest } = useUserStore();

  return (
    <div className=' flex flex-col py-[100px] px-[130px]'>

      {authUser.role === 'instructor' &&
        <>
          <div className='flex items-center  justify-center gap-4 text-zinc-600'>

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


          <div className='flex flex-col pt-[80px] mb-20 w-full'>
            <h1 className='text-3xl font-bold'>Latest Enrollments</h1>

            <div className='bg-white  border border-zinc-400 rounded-md shadow-xl m-6 mt-6 '>
              <div className=' flex items-center justify-between p-4 border-b border-zinc-400 w-full font-extrabold text-xl'>
                <h1 className=' font-semibold px-1'>#</h1>
                <h1 className=' font-semibold basis-[45%]  '>Student name</h1>
                <h1 className=' font-semibold basis-[45%]'>Course Title</h1>
              </div>



              {
                dummyCourses.slice(0, 2).map((course, idx) => (
                  <div key={idx} className='flex items-center justify-between p-4 border-b border-zinc-500'>

                    <p className='p-1'>{idx + 1}</p>
                    <div className='flex items-center gap-3 basis-[45%]'>
                      <img src={profile_img_1} alt="" className='w-12 rounded-full' />
                      <h1>student{idx + 1}</h1>
                    </div>

                    <div className='basis-[45%]'>{course.title}</div>
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
                          : "text-green-700"
                        }`}
                    >
                      {instructorRequest.status.replace(/^\w/, c => c.toUpperCase())}
                    </span>
                  )}
                </p>
                | <p className="text-sm  text-gray-600">Submitted on: {new Date(instructorRequest?.createdAt).toLocaleDateString()}</p>
              </div>

              {
                instructorRequest?.status == "pending" &&
                <button className='btn text-lg px-8 bg-red-700 text-white'
                  onClick={async() => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
                    if (confirmDelete) {
                      await deleteRequest({ requestId: instructorRequest._id });
                      await requestStatus(); 
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