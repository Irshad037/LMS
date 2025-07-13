import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { dummyCoursesPlayer } from '../../assets/assets';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import course from '../../assets/course_1.png'
import { IoMdStopwatch } from 'react-icons/io';
import { MdOutlineWatchLater } from 'react-icons/md';
import { GiOpenBook } from "react-icons/gi";

const PurchasePage = () => {
    const [createSeaction, setCreateSection] = useState(false);
    const [openSection, setOpenSection] = useState({})

    const averageRating = 3.5;

    const toggleSection = (index) => {
        setOpenSection((prev) => ({
            ...prev, [index]: !prev[index]
        }));
    }
    return (
        <div className='px-[130px] py-[100px] flex items-center '>
            <div className='flex-1 flex flex-col gap-3'>
                <h1 className='text-4xl font-bold leading-snug '>Learn from the best</h1>
                <p className="text-gray-500 text-base leading-relaxed ">
                    Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
                </p>

                <div className='flex items-center gap-1 text-yellow-500 cursor-pointer'>
                    <p className='text-gray-500 text-base leading-relaxed'>{averageRating}</p>
                    {Array.from({ length: 5 }, (_, i) => {
                        const value = i + 1;
                        if (averageRating > value) return <FaStar size={14} />
                        else if (averageRating >= value - 0.5) return <FaStarHalfAlt size={15} />
                        else return <FaRegStar size={16} />
                    })}
                    <p className="text-gray-500 text-base leading-relaxed ">
                        <span className='text-blue-500 mx-1'> (1rating) </span>2 students
                    </p>
                </div>

                <p className="text-gray-500 text-base leading-relaxed ">
                    Course by<span className='text-blue-500 mx-1 underline cursor-pointer'>Tebular </span>
                </p>


                <h1 className='text-2xl font-bold mt-2'>Course Structure</h1>

                <div className='flex flex-col items-center justify-center gap-5 w-full'>

                    {dummyCoursesPlayer[0].content.map((section, index) => (

                        <div key={section.sectionTitle} className='w-full flex justify-between '>

                            <div className='basis-[90%] border-zinc-500 shadow-xl mt-4 bg-white rounded-r-md rounded-b-md'>

                                <div className='flex items-center justify-between w-full border-b border-zinc-400 shadow-lg  p-[10px] gap-4'>
                                    <div className='flex items-center flex-1 gap-2'>
                                        <button onClick={() => toggleSection(index)}>
                                            {openSection[index] ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>

                                        <h1 className='text-xl font-bold text-zinc-700'>{section.sectionTitle}</h1>
                                    </div>
                                </div>

                                {openSection[index] && <>
                                    {section.videos.map((video) => (

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
                                </>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2 mt-16">
                    <h1 className="text-2xl font-bold mt-2">What is in this course?</h1>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>2 year access</li>
                        <li>Free resume guidance</li>
                        <li>Step-by-step hands-on project guidance</li>
                        <li>Mentorship sessions</li>
                        <li>Certificate of Completion</li>
                    </ul>
                </div>

            </div>
            <div className='flex-1 flex justify-center gap-1'>
                <div className='bg-white w-[430px] flex flex-col'>
                    <img src={course} alt="thumnail" />

                    <div className='p-4 mt-4' >
                        <div className='flex items-center gap-1'>
                            <IoMdStopwatch size={20} className='text-red-400 ' />
                            <p className='text-red-400 text-base font-md my'>5 day left at this price</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-4xl font-semibold leading-snug'> $55.99</h1>
                            <p className='text-xl text-zinc-500 font-semibold line-through'>$69.99</p>
                            <p className='text-xl text-zinc-500 font-semibold'>20% off</p>
                        </div>

                        <div className='flex items-center gap-3 text-zinc-500'>
                            <div className='flex items-center gap-1'> 
                                <FaStar className='text-yellow-500'/>
                                <p>{averageRating}</p>
                            </div> 
                            |
                            <p className='text-zinc-500 text-base font-md my'>45 hour, 35 minutes</p>
                            |
                            <div className='flex items-center gap-1'>
                                <GiOpenBook />
                                <p>4 lecture</p>
                            </div>
                        </div>

                        <button className='btn btn-primary w-full  my-6'>Enroll Now</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PurchasePage