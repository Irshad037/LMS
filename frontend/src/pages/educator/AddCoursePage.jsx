import React, { useRef, useState } from 'react'
import file_upload_icon from '../../assets/file_upload_icon.svg'
import { IoCloseSharp } from "react-icons/io5";
import { useCourseStore } from '../../store/useCourseStore';



const AddCoursePage = () => {
  const { createCourse, isCreatingCourse } = useCourseStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    coursePrice: "",
    discount: "",
    thumbnail: "",
  })
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImg(reader.result);
      }
      reader.readAsDataURL(file)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData, thumbnail: img
    }
    await createCourse(payload)
    console.log(payload);
    setFormData({ title: "", description: "", category: "", coursePrice: "", discount: "", thumbnail: "" })
    setImg(null)
  }

  return (
    < div className=' flex items-center  justify-center' >
      <form className=" w-[40%] rounded-xl p-6 my-20 shadow bg-white flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl font-semibold text-zinc-700 mb-1">Course Title</h2>
          <input
            type="text"
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='w-full border-zinc-700 p-2 border rounded-[4px]'
            placeholder='Type here'
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-700 ">Course Description</h2>
          <input
            type="text"
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            className='w-full border-zinc-700 p-2 border rounded-[4px]'
            placeholder='Type here'
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-700 ">Category</h2>
          <input
            type="text"
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            className='w-full border-zinc-700 p-2 border rounded-[4px]'
            placeholder='Type here'
          />
        </div>

        <div className=' flex items-center gap-3'>

          <h3 className='text-xl text-zinc-600 font-semibold '>Add Thumbnail</h3>

          <div className='w-10 h-10 bg-blue-700 flex items-center justify-center rounded-md'>
            <img src={file_upload_icon} alt="file"
              className='w-6 h-6 cursor-pointer text-white'
              onClick={() => imgRef.current.click()}
            />
          </div>

          {img &&
            <div className='relative bg-gray-800 w-60 mx-auto'>
              <IoCloseSharp
                className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                onClick={() => {
                  setImg(null);
                  imgRef.current.value = null;
                }}
              />
              <img src={img} className='w-full mx-auto  object-contain rounded' />
            </div>
          }
          <div>
            <input type="file" accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
          </div>

        </div>

        <div className=' flex items-center justify-between gap-10'>
          <div className='flex-1'>
            <h2 className="text-xl font-semibold text-zinc-700 mb-1">Course Price</h2>
            <input
              type="number"
              name='coursePrice'
              value={formData.coursePrice}
              onChange={handleInputChange}
              className='w-full border-zinc-700 p-2 border rounded-[4px]'
              placeholder='0'
            />
          </div>
          <div className=' flex-1'>
            <h2 className="text-xl font-semibold text-zinc-700 mb-1">Discount %</h2>
            <input
              type="number"
              name='discount'
              value={formData.discount}
              onChange={handleInputChange}
              className='w-full border-zinc-700 p-2 border rounded-[4px]'
              placeholder='0'
            />
          </div>
        </div>



        <button className='btn bg-zinc-800 hover:bg-black text-white '
          disabled={isCreatingCourse}
        >
          {isCreatingCourse ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div >



  )
}

export default AddCoursePage
