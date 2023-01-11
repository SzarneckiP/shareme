import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from "axios"
import jwt_decode from 'jwt-decode'

import { client } from '../utils/client'
import { useNavigate } from 'react-router-dom'
// import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

import useAuthStore from '../store/authStore'

const Login = () => {

    const { userProfile, addUser } = useAuthStore()
    const navigate = useNavigate()

    const createOrGetUser = (response) => {
        const decoded = jwt_decode(response.credential)

        const { name, sub, picture } = decoded

        const user = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        }

        addUser(user)

        client.createIfNotExists(user)
            .then(() => {
                navigate('/', { replace: true })
            })
    }


    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
            </div>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className="p-5">
                    <img src={logo} alt='shareme logo' width='130px' />
                </div>
                <div className="shadow-2x1">
                    <GoogleLogin
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={() => console.log('error')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login