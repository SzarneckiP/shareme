import React, { useState, useRef, useEffect } from 'react'

import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components'
import { Pins } from '.'

import logo from '../assets/logo.png'

import useAuthStore from '../store/authStore'

const Home = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false)
    // const [user, setUser] = useState()
    // const user = undefined
    const { userProfile } = useAuthStore()

    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    });

    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 easy-out'>
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={userProfile && userProfile} />
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-4 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
                    <Link to='/'>
                        <img src={logo} alt="logo" className='w-28' />
                    </Link>
                    {userProfile !== null && userProfile.image ? (
                        <Link to={`user-profile/${userProfile?._id}`}>
                            <img src={userProfile?.image} alt="userImage" className='w-12 h-12 rounded-full' />
                        </Link>
                    ) : (
                        <Link
                            to={'login'}
                            className='p-2 border-black border-2 font-extrabold cursor-pointer'
                        >
                            Login
                        </Link>
                    )}
                </div>
                {toggleSidebar && (
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-aut shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
                        </div>
                        <Sidebar closeToggle={setToggleSidebar} user={userProfile && userProfile} />
                    </div>
                )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home