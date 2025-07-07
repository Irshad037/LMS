import React from 'react'
import { Outlet } from 'react-router-dom'
import EducatoreSideBar from './EducatoreSideBar'

const EducatorLayout = () => {
    return (
        <div className='flex'>
            <EducatoreSideBar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default EducatorLayout