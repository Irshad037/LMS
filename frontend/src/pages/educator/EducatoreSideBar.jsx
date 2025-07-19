import React from 'react';
import { NavLink } from 'react-router-dom';
import home_icon from '../../assets/home_icon.svg';
import add_icon from '../../assets/add_icon.svg';
import my_course_icon from '../../assets/my_course_icon.svg';
import person_tick_icon from '../../assets/person_tick_icon.svg';
import { useUserStore } from '../../store/useUserStore';

const navItems = [
  { name: 'Dashboard', icon: home_icon, path: '/educator/dashboard' },
  { name: 'Add Course', icon: add_icon, path: '/educator/add-course' },
  { name: 'My Courses', icon: my_course_icon, path: '/educator/my-courses' },
  { name: 'Students Enrolled', icon: person_tick_icon, path: '/educator/students-enrolled' },
];

const EducatorSidebar = () => {

  const { requestStatus, instructorRequest } = useUserStore();
  const isApproved = instructorRequest?.status === 'approved';

  return (
    <div className="h- flex flex-col bg-white w-64 border-r-2 shadow border-zinc-300 px-6 py-8 gap-5">

      {
        !isApproved &&
        <NavLink
          key="Dashboard"
          to={'/educator/dashboard'}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
          duration-200 bg-blue-100 text-blue-600 font-semibold "

        >
          <img src={home_icon} alt={home_icon} className="w-6 h-6" />
          <span>Dashboard</span>
        </NavLink>

      }


      {
        isApproved &&
        <>
          {navItems.map(({ name, icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <img src={icon} alt={name} className="w-6 h-6" />
              <span>{name}</span>
            </NavLink>
          ))}
        </>

      }

    </div>
  );
};

export default EducatorSidebar;
