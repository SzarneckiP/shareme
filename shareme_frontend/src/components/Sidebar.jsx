import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'

import logo from '../assets/logo.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 easy-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 easy-in-out capitalize'

const categories = [
    { name: 'Animals' },
    { name: 'Wallpapers' },
    { name: 'Photography' },
    { name: 'Gaming' },
    { name: 'Coding' },
    { name: 'Other' },
]

const Sidebar = ({ closeToggle, user }) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }

    return (
        <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
            <div className="flex flex-col">
                <Link
                    to='/'
                    onClick={handleCloseSidebar}
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'>
                    <img src={logo} alt="logo" className='w-full ' />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                    to={`/user-profile/${user._id}`}
                    className='flex my-5 mb-3 gap-2 p-2 items-center bg-white shadow-lg rounded-lg mx-3'
                    onClick={handleCloseSidebar}
                >
                    <img src={user.image} alt="userImage" className='m-3 rounded-full w-12 h-12' />
                    <p>{user.userName}</p>
                </Link>
            )}
        </div>
    )
}

export default Sidebar