import { useRef, useState } from 'react'
import { useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useCourseStore } from '../../store/useCourseStore';
import { useParams } from 'react-router-dom';
import file_upload_icon from '../../assets/file_upload_icon.svg'
import cross_icon from '../../assets/cross_icon.svg'
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useAuthStore from '../../store/useAuthStore';

const CoursePlayerPage = () => {

    const { createSection: createSectionFnc, isCreatingSection, getMyCreatedCourse, myCreatedCourse,
        addVideoToSection, isAddingVideo, deleteSection, deleteSectionId, deleteVideo, deleteVideoId,
        addreview, isAddingReview,deleteReview,isDeletingReview
    } = useCourseStore();

    const { authUser } = useAuthStore();

    const [createSeaction, setCreateSection] = useState(false);
    const [addVideoModal, setAddVideoModal] = useState(false);
    const [playLecture, setPlayLecture] = useState(false);
    const [sectionTitle, setSectionTitle] = useState("");
    const [openSection, setOpenSection] = useState({})
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [comment, setComment] = useState("");
    const { courseId } = useParams();
    const [videoURL, setVideoURL] = useState(null);
    const videoRef = useRef(null);
    const [sectionId, setSectionId] = useState("");
    const [formData, setFormData] = useState({ title: "", duration: "", video: null })
    const [currVideoInfo, setCurrVideoInfo] = useState({ title: "", videoUrl: "", Sidx: 0, Vidx: 0 });



    const currCourse = myCreatedCourse?.find((course) => course._id === courseId);
    const contents = currCourse?.content || [];
    const isReviewed = currCourse?.reviews?.find((review) => review.user === authUser._id);

    const handleStarClick = (value) => {
        setSelectedRating(value);
    };

    const handleComment = async () => {

        const payload = {
            rating: selectedRating,
            comment: comment
        }
        await addreview(courseId, payload);
        console.log("Rating:", selectedRating);
        console.log("Comment:", comment);

        setSelectedRating(0);
        setComment("");
    }

    const handleDeleteReview =async()=>{
        await deleteReview(courseId,isReviewed._id)
    }

    const toggleSection = (index) => {
        setOpenSection((prev) => ({
            ...prev, [index]: !prev[index]
        }));
    }

    const handleAddVideo = async (e) => {
        e.preventDefault();

        await addVideoToSection(courseId, sectionId, formData)
        console.log(formData, sectionId);

        // Reset form fields
        setFormData({ title: "", duration: "", video: null });
        setSectionId("");
        setVideoURL(null);
        setAddVideoModal(false);
    };

    const handleCreateSection = async (e) => {
        e.preventDefault();
        await createSectionFnc(courseId, { sectionTitle });
        setSectionTitle("");
        setCreateSection(!createSeaction)
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideoURL(URL.createObjectURL(file)); // blob URL for preview
        setFormData((prev) => ({
            ...prev,
            video: file, // ✅ include the File object in your formData
        }));

    };


    useEffect(() => {
        getMyCreatedCourse();
    }, []);

    useEffect(() => {
        console.log("isReviewed", isReviewed);
    }, [currCourse]);


    return (
        <div className='px-[130px] py-[70px] my-9 flex items-center flex-col relative'>

            {createSeaction && (
                <form onSubmit={handleCreateSection} className='w-[400px] h-[220px] shadow-md shadow-black bg-white mt-10 rounded-md absolute top-5'>

                    <img src={cross_icon} alt="close" className='mt-4 ml-4 w-4 cursor-pointer'
                        onClick={() => setCreateSection(!createSeaction)}
                    />
                    <div className='w-full p-6 flex items-center flex-col gap-4'>
                        <h2 className="text-xl font-bold ">Section Title</h2>
                        <input
                            type="text"
                            name='title'
                            value={sectionTitle}
                            onChange={(e) => setSectionTitle(e.target.value)}
                            className='w-full border-zinc-700 p-2 border rounded-[4px]'
                            placeholder='Type here'
                        />
                        <button type="submit" className='btn btn-primary w-full' disabled={isCreatingSection}>
                            {isCreatingSection ? <><LoadingSpinner /> Adding...</> : "Add"}
                        </button>
                    </div>
                </form>
            )}

            {addVideoModal && (
                <div className=" flex items-center justify-center w-[400px] bg-white my-10 absolute t-6 z-10 rounded-md shadow-2xl shadow-black">
                    <form onSubmit={handleAddVideo} className="w-full rounded-xl p-6 shadow bg-white flex flex-col gap-6">
                        <img src={cross_icon} alt="close" className='mt-4 ml-4 w-4 cursor-pointer'
                            onClick={() => setAddVideoModal(!addVideoModal)}
                        />
                        {/* Video Title Input */}
                        <div>
                            <h2 className="text-xl font-bold mb-1 text-center">Video Title</h2>
                            <input
                                type="text"
                                name='title'
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                className="w-full border border-zinc-400 p-2 rounded-sm focus:outline-none focus:border-zinc-700"
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
                                    accept="video/*"
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

                        <div className=' flex items-center gap-4'>
                            <h2 className="text-xl text-zinc-600 font-semibold">Duration</h2>
                            <input
                                type="number"
                                name='duration'
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                className="basis-[70%] w-full border border-zinc-400 p-2 rounded-sm focus:outline-none focus:border-zinc-700"
                                placeholder="Type here"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary hover:bg-black text-white px-4 py-2 rounded-md"
                            disabled={isAddingVideo}
                        >
                            {isAddingVideo ? <><LoadingSpinner /> Adding...</> : "Add"}
                        </button>
                    </form>
                </div>
            )}

            <div className='flex items-center justify-between mb-[70px] gap-10 w-full'>

                <div className='flex items-center flex-col  basis-[50%] '>

                    <div className=' mb-2 w-full  flex items-center justify-between'>
                        <h1 className='text-2xl font-bold '>Course Structure</h1>

                        {authUser._id === currCourse?.instructor && (
                            <button
                                onClick={() => setCreateSection(!createSeaction)}
                                className='btn btn-primary '
                            >
                                Create Section
                            </button>
                        )}

                    </div>

                    {contents.length === 0 && (
                        <div className='w-full h-32 bg-white mt-10 p-6 rounded-md shadow-xl'>
                            <div className='bg-slate-200 w-full h-full rounded-md shadow-inner flex items-center justify-center'>
                                <p className="text-center text-gray-500 italic text-lg ">No section Added yet</p>
                            </div>
                        </div>

                    )}

                    {contents.map((section, index) => (

                        <div key={index} className='w-full h-full flex justify-between '>

                            {authUser._id === currCourse?.instructor && (
                                <>
                                    {deleteSectionId === section._id ? (<LoadingSpinner size={16} />) :

                                        (<div
                                            className='basis-[10%] mt-4 p-4 w-[58px] h-[60px] border border-zinc-300 shadow-xl rounded-l-md bg-white flex items-center justify-center'>
                                            <MdDeleteForever size={25} className='cursor-pointer hover:text-red-700'
                                                onClick={async () => {
                                                    const confirmDelete = window.confirm("Are you sure you want to delete this section?");
                                                    if (confirmDelete) {
                                                        await deleteSection(currCourse._id, section._id);
                                                    }
                                                }}
                                            />
                                        </div>
                                        )
                                    }
                                </>

                            )}

                            <div className={`basis-[90%] border-1 border-zinc-500 shadow-xl mt-4 bg-white ${authUser._id != currCourse?.instructor ? "rounded-md" : "rounded-r-md"} `}>

                                <div className='flex items-center justify-between w-full h-[60px] border-b border-zinc-500 shadow-lg  p-[10px] gap-4'>
                                    <div className='flex items-center flex-1 gap-2'>
                                        <button onClick={() => toggleSection(index)}>
                                            {openSection[index] ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>

                                        <h1 className='text-xl font-bold text-zinc-700'>{section.sectionTitle}</h1>
                                    </div>

                                    {authUser._id === currCourse?.instructor && (
                                        <button className='btn bg-zinc-700 text-white hover:bg-black '
                                            onClick={() => {
                                                setAddVideoModal(!addVideoModal)
                                                setSectionId(section._id);
                                            }}
                                        >
                                            Add video
                                        </button>
                                    )}

                                </div>


                                <div className={`overflow-hidden transition-all duration-500 ease-in-out
                                    ${openSection[index] ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"}`}
                                >
                                    {section?.videos?.length === 0 && (
                                        <p className="text-center text-gray-500 italic p-5">No videos added in this section</p>
                                    )}

                                    {section?.videos.map((video, idx) => (

                                        <div key={video.publicId || idx} className='py-[10px] pl-3 pr-[30px] gap-2 flex items-center justify-between w-full'>

                                            <div className=' flex items-center gap-1'>
                                                <h1 className='text-lg'>{index + 1}.{idx + 1}</h1>.
                                                <div className='bg-zinc-600 w-5 h-5 flex items-center justify-center rounded-full text-white'>
                                                    <TbPlayerPlayFilled className='w-2' />
                                                </div>
                                                <h1 className='text-base font-semibold text-zinc-600'>{video.title}</h1>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <div className='text-blue-600 text-base font-semibold cursor-pointer'
                                                    onClick={() => {
                                                        setPlayLecture(true)
                                                        setCurrVideoInfo({
                                                            title: video.title,
                                                            videoUrl: video.videoUrl,
                                                            Vidx: idx,
                                                            Sidx: index
                                                        })
                                                    }}
                                                >
                                                    Watch
                                                </div>
                                                <div className='text-base font-semibold text-zinc-600'>{video.duration} Minutes</div>

                                                {authUser._id === currCourse?.instructor && (<>
                                                    {deleteVideoId === video._id ? (
                                                        <LoadingSpinner size={16} />
                                                    ) : (
                                                        <MdDeleteForever
                                                            size={19}
                                                            className="text-red-700 cursor-pointer hover:text-red-950"
                                                            onClick={async () => {
                                                                const confirmDelete = window.confirm("Are you sure you want to delete this lecture?");
                                                                if (confirmDelete) {
                                                                    await deleteVideo(currCourse._id, section._id, video._id);
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </>)}


                                            </div>

                                        </div>
                                    ))}
                                </div>



                            </div>

                        </div>


                    ))}

                </div>

                <div className=' flex-1 mt-16 '>
                    {!playLecture && (
                        <div>
                            <img src={currCourse?.thumbnail} alt="" className='w-full rounded-xl shadow-md shadow-zinc-900 ' />
                        </div>
                    )}

                    {playLecture && (
                        <div className="w-full bg-white rounded-xl border border-zinc-300 shadow-sm overflow-hidden">
                            <video
                                controls
                                className="w-full aspect-video object-cover"
                                src={currVideoInfo.videoUrl}
                            >
                                Your browser does not support the video tag.
                            </video>

                            <div className="p-4 bg-zinc-50 flex items-center gap-2">
                                <span className="text-xl font-semibold text-zinc-500">
                                    {currVideoInfo.Sidx + 1}.{currVideoInfo.Vidx + 1}
                                </span>
                                <h2 className="text-xl font-bold text-zinc-700 truncate">
                                    {currVideoInfo.title}
                                </h2>
                            </div>
                        </div>


                    )}

                </div>

            </div>

            {!isReviewed ? (<div className='w-full mt-14 flex items-center justify-center'>

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
                                            ? "text-yellow-500 "
                                            : "text-white "
                                    }
                                    onClick={() => handleStarClick(value)}
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
                        {
                            isAddingReview ? (<> <LoadingSpinner /> "Adding..."</>) : "Submit Review"
                        }

                    </button>
                </div>
            </div>
            ) : (
                <div className="w-full mt-10 flex flex-col items-center">
                    <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md border border-zinc-200 relative">

                        {/* Heading and Rating */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-zinc-800">Your Review</h2>
                            <span className="text-sm text-zinc-500">{isReviewed.rating}/5</span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex gap-1 mb-3 text-yellow-500">
                            {Array.from({ length: 5 }, (_, i) => {
                                const value = i + 1;
                                if (isReviewed.rating >= value) {
                                    return <FaStar key={i} size={22} />;
                                } else if (isReviewed.rating >= value - 0.5) {
                                    return <FaStarHalfAlt key={i} size={22} />;
                                } else {
                                    return <FaRegStar key={i} size={22} className="text-zinc-400" />;
                                }
                            })}
                        </div>

                        {/* Comment */}
                        <p className="text-zinc-600 italic bg-zinc-50 px-4 py-3 rounded-md border border-zinc-200">
                            “{isReviewed.comment}”
                        </p>

                        {/* Delete Button */}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleDeleteReview} 
                                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 hover:border-red-300 transition"
                            >
                                {isDeletingReview?(<><LoadingSpinner/> Deleting...</>):"Delete Review"}
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div >

    )
}

export default CoursePlayerPage