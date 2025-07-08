import React, { useRef, useState } from 'react'



const AddCoursePage = () => {
  const [activeTab, setActiveTab] = useState("course");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const handleImgChange = (e)=>{
    const file = e.target.files[0];
    
    if(file){
      const reader = new FileReader();

      reader.onload = () =>{
        setImg(reader.result);
      }
      reader.readAsDataURL(file)
    }
    
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "course":
        return (
          <>
            <div>
              <h2 className="text-xl font-semibold text-zinc-700 mb-1">Course Title</h2>
              <input
                type="text"
                className='w-full border border-zinc-700 p-2'
                placeholder='Type here'
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-zinc-700 ">Course Description</h2>
              <input
                type="text"
                className='w-full border border-zinc-700 p-2'
                placeholder='Type here'
              />
            </div>

            <div>
              <input type="file" />
            </div>


          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className='flex flex-col gap-6 border-b border-gray-200 mb-6'>
      <div className=' bg-white w-full h-16 border-b border-zinc-400 flex items-center justify-around  gap-2'>

        {["course", "chapter"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
               flex-1 h-full text-2xl font-semibold transition-colors duration-200
              ${activeTab == tab ? 'bg-black text-white font-extrabold' : 'text-gray-700 hover:bg-gray-100 '}
            `}

          >
            {tab == "course" ? "Add Course" : "Add Chapter"}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className=' flex items-center justify-center'>
        <div className="bg-white w-2/4 rounded-xl p-6 shadow flex flex-col gap-4">{renderTabContent()}</div>
      </div>


    </div>
  )
}

export default AddCoursePage
