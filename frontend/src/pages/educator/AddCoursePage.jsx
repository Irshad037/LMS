import React, { useRef, useState } from 'react'
import file_upload_icon from '../../assets/file_upload_icon.svg'
import { IoCloseSharp } from "react-icons/io5";



const AddCoursePage = () => {
  const [activeTab, setActiveTab] = useState("course");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

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


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    < div className = ' flex items-center ' >
      <form className=" w-[40%] rounded-xl p-6 mt-7 flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl font-semibold text-zinc-700 mb-1">Course Title</h2>
          <input
            type="text"
            className='w-full border-zinc-700 p-2 border rounded-[4px]'
            placeholder='Type here'
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-zinc-700 ">Course Description</h2>
          <input
            type="text"
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
            <input type="file" accept='image/' hidden ref={imgRef} onChange={handleImgChange} />
          </div>

        </div>


          <div className='flex-1'>
            <h2 className="text-xl font-semibold text-zinc-700 mb-1">Course Price</h2>
            <input
              type="number"
              className='w-full border-zinc-700 p-2 border rounded-[4px]'
              placeholder='0'
            />
          </div>
          <div className=' flex-1'>
            <h2 className="text-xl font-semibold text-zinc-700 mb-1">Discount %</h2>
            <input
              type="number"
              className='w-full border-zinc-700 p-2 border rounded-[4px]'
              placeholder='0'
            />
          </div>
        

        <button className='btn bg-zinc-800 hover:bg-black text-white '>Add</button>
      </form>
      </div >



  )
}

export default AddCoursePage
