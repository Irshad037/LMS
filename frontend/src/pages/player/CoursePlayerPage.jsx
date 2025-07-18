import React, { useRef, useState } from 'react'
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { dummyCoursesPlayer } from '../../assets/assets'
import cross_icon from '../../assets/cross_icon.svg'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import file_upload_icon from '../../assets/file_upload_icon.svg'
import { IoCloseSharp } from "react-icons/io5";

const CoursePlayerPage = () => {
    const [createSeaction, setCreateSection] = useState(false);
    const [openSection, setOpenSection] = useState({})
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [comment, setComment] = useState("");
    const [video, setVideo] = useState(null);
    const [videoURL, setVideoURL] = useState(null);
    const videoRef = useRef(null);


    const handleClick = (value) => {
        setSelectedRating(value);
    };
    const handleComment = () => {

        if (!selectedRating) {
            alert("Please provide Rating");
            return;
        }

        // TODO: send `selectedRating` and `comment` to backend (API)
        console.log("Rating:", selectedRating);
        console.log("Comment:", comment);

        setSelectedRating(0);
        setComment("");
    }

    const toggleSection = (index) => {
        setOpenSection((prev) => ({
            ...prev, [index]: !prev[index]
        }));
    }

    const handleCreateSection = (e) => {
        e.preventDefault();
        setCreateSection(!createSeaction)
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "video/mp4") {
            setVideo(file);
            setVideoURL(URL.createObjectURL(file)); // blob URL for preview
        } else {
            alert("Please upload a .mp4 file");
        }
    };



    return (
        <div className='px-[130px] py-[70px] my-9 flex items-center flex-col'>

            <div className='flex items-center justify-between gap-10'>
                <div className='flex items-center flex-col  flex-1'>

                    <div className=' mb-2 w-full flex items-center justify-between'>
                        <h1 className='text-2xl font-bold '>Course Structure</h1>
                        <button
                            onClick={() => setCreateSection(!createSeaction)}
                            className='btn btn-primary '
                        >
                            Create Section
                        </button>
                    </div>

                    {createSeaction &&
                        <form onSubmit={handleCreateSection} className='w-[400px] h-[220px] shadow-md shadow-black bg-white mt-10 rounded-md'>

                            <img src={cross_icon} alt="close" className='mt-4 ml-4 w-4 cursor-pointer'
                                onClick={() => setCreateSection(!createSeaction)}
                            />
                            <div className='w-full p-6 flex items-center flex-col gap-4'>
                                <h2 className="text-xl font-bold ">Section Title</h2>
                                <input
                                    type="text"
                                    className='w-full border-zinc-700 p-2 border rounded-[4px]'
                                    placeholder='Type here'
                                />
                                <button oncli className='btn btn-primary w-full '>Add</button>
                            </div>
                        </form>
                    }

                    {dummyCoursesPlayer[0].content.map((section, index) => (

                        <div key={section.sectionTitle} className='w-full flex justify-between '>

                            <div
                                className='basis-[10%] mt-4 p-4 w-[58px] h-[60px] border border-zinc-300 shadow-xl rounded-l-md bg-white flex items-center justify-center'>
                                <MdDeleteForever size={25} className='cursor-pointer hover:text-red-700' />
                            </div>

                            <div className='basis-[90%] border-1 border-zinc-500 shadow-xl mt-4 bg-white rounded-r-md rounded-b-md'>

                                <div className='flex items-center justify-between w-full border-b border-zinc-500 shadow-lg  p-[10px] gap-4'>
                                    <div className='flex items-center flex-1 gap-2'>
                                        <button onClick={() => toggleSection(index)}>
                                            {openSection[index] ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>

                                        <h1 className='text-xl font-bold text-zinc-700'>{section.sectionTitle}</h1>
                                    </div>
                                    <button className='btn bg-zinc-700 text-white hover:bg-black'>Add video</button>
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
                                                <MdDeleteForever size={19} className='text-red-700 cursor-pointer hover:text-red-950' />
                                            </div>





                                        </div>
                                    ))}
                                </>}
                            </div>



                        </div>


                    ))}


                    <div className="flex items-center justify-center w-[400px] bg-white my-10">
                        <form className="w-full rounded-xl p-6 shadow bg-white flex flex-col gap-6">

                            {/* Video Title Input */}
                            <div>
                                <h2 className="text-xl font-bold mb-1 text-center">Video Title</h2>
                                <input
                                    type="text"
                                    className="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:border-zinc-700"
                                    placeholder="Type here"
                                />
                            </div>

                            {/* Video Upload Section */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl text-zinc-600 font-semibold">Add Video</h3>
                                    <div
                                        className="w-10 h-10 bg-blue-700 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-800"
                                        onClick={() => videoRef.current.click()}
                                    >
                                        <img src={file_upload_icon} alt="Upload" className="w-6 h-6" />
                                    </div>
                                    <input
                                        type="file"
                                        accept="video/mp4"
                                        hidden
                                        ref={videoRef}
                                        onChange={handleVideoChange}
                                    />
                                </div>

                                {/* Preview if video is selected */}
                                {videoURL && (
                                    <div className="relative bg-gray-800 w-full rounded overflow-hidden ">
                                        <IoCloseSharp
                                            className="absolute top-2 right-2 text-white bg-gray-700 rounded-full w-6 h-6 p-1 cursor-pointer z-10 pointer-events-auto"
                                            onClick={() => {
                                                setVideo(null);
                                                setVideoURL(null);
                                                videoRef.current.value = null;
                                            }}
                                        />
                                        <video
                                            src={videoURL}
                                            controls
                                            className="w-full aspect-video object-contain rounded"
                                        />

                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn bg-zinc-800 hover:bg-black text-white px-4 py-2 rounded-md"
                            >
                                Add
                            </button>
                        </form>
                    </div>



                </div>


                <div className=' flex-1 mt-16 '>
                    <video
                        controls
                        className="w-full rounded-xl shadow-md "
                        src="https://res.cloudinary.com/di18zpmn5/video/upload/v1751224822/lms_videos/a4ft3iddpjtjiyutkaym.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <h1 className='text-xl ml-3 font-semibold'>video title</h1>
                </div>




            </div>

            <div className='w-full mt-14 flex items-center justify-center'>
                <div className='w-[50%]'>
                    {/* Rating */}
                    <div className='flex items-center gap-2'>
                        <h1 className='text-2xl font-bold'>Rate this course:</h1>
                        <div className="flex gap-1 text-yellow-500 cursor-pointer">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <FaStar
                                    key={value}
                                    size={24}
                                    className={
                                        (hoveredStar || selectedRating) >= value
                                            ? "text-yellow-500"
                                            : "text-white"
                                    }
                                    onClick={() => handleClick(value)}
                                    onMouseEnter={() => setHoveredStar(value)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Comment box */}
                    <textarea
                        className="w-full mt-4 p-3 border rounded-md text-zinc-800"
                        rows={4}
                        placeholder="Leave your feedback here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    {/* Submit button */}
                    <button
                        onClick={handleComment}
                        className="mt-3 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                </div>
            </div>


        </div>

    )
}

export default CoursePlayerPage