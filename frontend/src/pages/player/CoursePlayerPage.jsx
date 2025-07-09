import React from 'react'
import { FaChevronUp } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { dummyCoursesPlayer } from '../../assets/assets'

const CoursePlayerPage = () => {
    return (
        <div className='px-[130px] flex items-center justify-between gap-10 my-9'>
            <div className='flex items-center flex-col  flex-1'>

                <div className=' mb-2 w-full'>
                    <h1 className='text-3xl font-bold '>Course Structure</h1>
                </div>

                {dummyCoursesPlayer[0].content.map((section) => (

                    <div key={section.sectionTitle} className=' w-full border-1 border-zinc-500 shadow-xl mt-4 bg-white rounded-md'>

                        <div className='flex items-center w-full border-b border-zinc-500 shadow-lg  p-[10px] gap-2'>
                            <FaChevronUp />
                            <h1 className='text-xl font-bold text-zinc-700'>{section.sectionTitle}</h1>
                        </div>

                        {section.videos.map((video)=>(

                            <div key={video.publicId} className='py-[10px] px-[30px] gap-2 flex items-center justify-between w-full'>

                            <div className=' flex items-center gap-1'>
                                <div className='bg-zinc-600 w-5 h-5 flex items-center justify-center rounded-full text-white'>
                                    <TbPlayerPlayFilled className='w-2' />
                                </div>
                                <h1 className='text-base font-semibold text-zinc-600'>{video.title}</h1>
                            </div>

                            <div className='flex items-center gap-2'>
                                <div className='text-blue-600 text-base font-semibold cursor-pointer'>Watch</div>
                                <div className='text-base font-semibold text-zinc-600'>{video.duration} Minutes</div>
                            </div>


                        </div>
                        ))}

                        

                    </div>
                ))}





            </div>



            <video
                controls
                className="flex-1 w-40 rounded-xl shadow-md  mt-16"
                src="https://res.cloudinary.com/di18zpmn5/video/upload/v1751224822/lms_videos/a4ft3iddpjtjiyutkaym.mp4"
            >
                Your browser does not support the video tag.
            </video>



        </div>
    )
}

export default CoursePlayerPage