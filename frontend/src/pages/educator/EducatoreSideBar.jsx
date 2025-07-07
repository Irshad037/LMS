import React from 'react'
import home_icon from '../../assets/home_icon.svg'
import add_icon from '../../assets/add_icon.svg'
import my_course_icon from '../../assets/my_course_icon.svg'
import person_tick_icon from '../../assets/person_tick_icon.svg'

const EducatoreSideBar = () => {
  return (
    <div className='h-[106vh] flex flex-col bg-white w-64 border-r-2 border-zinc-400 px-8 gap-5'>

      <div className='flex gap-3 mt-7'>
        <img src={home_icon} alt="home"/>
        <h1>Dashboard</h1>
      </div>

      <div className='flex gap-3'>
        <img src={add_icon} alt="home"/>
        <h1>Add Course</h1>
      </div>

      <div className='flex gap-3'>
        <img src={my_course_icon} alt="home"/>
        <h1>My Courses</h1>
      </div>

      <div className='flex gap-3'>
        <img src={person_tick_icon} alt="home"/>
        <h1>Student Enrolled</h1>
      </div>

    </div>
  )
}

export default EducatoreSideBar
