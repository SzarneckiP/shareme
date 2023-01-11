import React, { useState, useRef, useEffect } from 'react'

import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'

import { Login, Sidebar, UserProfile } from '../components'
import { Pins } from '../container'

import logo from '../assets/logo.png'

import useAuthStore from '../store/authStore'

const Home = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false)

    const { userProfile, addUser } = useAuthStore()
    console.log(userProfile);

    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 easy-out'>
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar />
            </div>
            <div className="flex md:hidden flex-row">
                <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
                <Link to='/'>
                    <img src={logo} alt="logo" className='w-28' />
                </Link>
            </div>
            <div className='flex flex-row '>
                {userProfile ? (
                    <div>
                        <Link className='text-xl' href='/'>{userProfile.userName}</Link>
                        {
                            userProfile.image && (
                                <Link href='/'>
                                    <img width={60} height={60} className='rounded-full' src={userProfile.image} alt="user image" />
                                </Link>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <Link to={'login'}>Login</Link>
                    </div>

                )}
            </div>
        </div>
    )
}

export default Home