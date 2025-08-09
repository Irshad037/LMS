import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { dummyCoursesPlayer } from '../../assets/assets';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import course from '../../assets/course_1.png'
import { IoMdStopwatch } from 'react-icons/io';
import { GiOpenBook } from "react-icons/gi";
import { useParams } from 'react-router-dom';
import { useCourseStore } from '../../store/useCourseStore';
import { useEffect } from 'react';
import { useUserStore } from '../../store/useUserStore';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PurchasePage = () => {
    const { getAllCourses, AllCourses } = useCourseStore();
    const { enrollInCourse, isEnrolling } = useUserStore();

    const [openSection, setOpenSection] = useState({})
    const { courseId } = useParams();

    const currCourse = AllCourses?.find((course) => course._id === courseId)
    const averageRating = 3.5;

    const toggleSection = (index) => {
        setOpenSection((prev) => ({
            ...prev, [index]: !prev[index]
        }));
    }

    useEffect(() => {
        getAllCourses();
    }, [])

    const getTotalDuration = (content) => {
        let totalMinutes = 0;

        content?.forEach(section => {
            section?.videos?.forEach(video => {
                const raw = video?.duration;
                if (!raw) return;

                if (raw.includes(".")) {
                    const [minStr, secStr] = raw.split(".");
                    const min = parseInt(minStr);
                    const sec = parseInt(secStr);

                    if (!isNaN(min)) totalMinutes += min;
                    if (!isNaN(sec)) totalMinutes += Math.floor(sec / 60);
                } else {
                    const min = parseInt(raw);
                    if (!isNaN(min)) totalMinutes += min;
                }
            });
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours} hour, ${minutes} minutes`;
    };


    return (
        <div className='px-[130px] py-[100px] flex items-center '>
            <div className='flex-1 flex flex-col gap-3'>
                <h1 className='text-4xl font-bold leading-snug '>Learn from the best</h1>
                <p className="text-gray-500 text-base leading-relaxed ">
                    {currCourse?.description}
                </p>

                <div className='flex items-center gap-1 text-yellow-500 cursor-pointer'>
                    <p className='text-gray-500 text-base leading-relaxed'>{currCourse?.averageRating}</p>
                    {Array.from({ length: 5 }, (_, i) => {
                        const value = i + 1;
                        if (currCourse?.averageRating > value) return <FaStar size={14} />
                        else if (currCourse?.averageRating >= value - 0.5) return <FaStarHalfAlt size={15} />
                        else return <FaRegStar size={16} />
                    })}
                    <p className="text-gray-500 text-base leading-relaxed ">
                        <span className='text-blue-500 mx-1'> ({currCourse?.reviews.length}) </span>{currCourse?.enrolledStudents?.length} students
                    </p>
                </div>

                <p className="text-gray-500 text-base leading-relaxed ">
                    Course by<span className='text-blue-500 mx-1 underline cursor-pointer'>{currCourse?.instructor?.name} </span>
                </p>


                <h1 className='text-2xl font-bold mt-2'>Course Structure</h1>

                <div className='flex flex-col items-center justify-center gap-5 w-full'>

                    {currCourse?.content?.length === 0 && (
                        <div className='w-full h-32 bg-white mt-10 p-6 rounded-md shadow-xl'>
                            <div className='bg-slate-200 w-full h-full rounded-md shadow-inner flex items-center justify-center'>
                                <p className="text-center text-gray-500 italic text-lg ">No section Added yet</p>
                            </div>
                        </div>

                    )}

                    {currCourse?.content.slice(0, 2).map((section, index) => (

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
                        <li>{currCourse?.additionalBenefits.accessDuration}</li>

                        {currCourse?.additionalBenefits.otherBenefits.map((benifit, idx) => (
                            <li key={idx}>{benifit}</li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className='flex-1 flex justify-center gap-1'>
                <div className='bg-white w-[430px] flex flex-col shadow-2xl shadow-zinc-500'>
                    <div className='h-[250px]'>

                        <img src={currCourse?.thumbnail} loading="lazy" alt="thumnail" className='h-full w-full object-cover' />
                    </div>

                    <div className='p-4 mt-4' >
                        <div className='flex items-center gap-1'>
                            <IoMdStopwatch size={20} className='text-red-400 ' />
                            <p className='text-red-400 text-base font-md my'>5 day left at this price</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-4xl font-semibold leading-snug'> ${currCourse?.discount}</h1>
                            <p className='text-xl text-zinc-500 font-semibold line-through'>${currCourse?.coursePrice}</p>
                            <p className='text-xl text-zinc-500 font-semibold'>{(((currCourse?.coursePrice - currCourse?.discount) / currCourse?.coursePrice) * 100).toFixed(0)}%off</p>
                        </div>

                        <div className='flex items-center gap-3 text-zinc-500'>
                            <div className='flex items-center gap-1'>
                                <FaStar className='text-yellow-500' />
                                <p>{currCourse?.averageRating}</p>
                            </div>
                            |
                            <p className='text-zinc-500 text-base font-md my'>{getTotalDuration(currCourse?.content)} </p>
                            |
                            <div className='flex items-center gap-1'>
                                <GiOpenBook />
                                <p>{currCourse?.content.length}</p>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary w-full my-6 flex items-center justify-center gap-2"
                            onClick={() => enrollInCourse(courseId)}
                            disabled={isEnrolling}
                        >
                            {isEnrolling ? (
                                <>
                                    <LoadingSpinner size="sm" /> Enrolling...
                                </>
                            ) : (
                                "Enroll Now"
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PurchasePage