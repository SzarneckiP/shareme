import React from 'react'
import { Circles } from 'react-loader-spinner'

const Spinner = ({ message }) => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full my-5'>
            <Circles
                color='#00BFFF'
                height={50}
                width={200}
            />
            <p className='text-lg text-center my-5 px-2'>{message}</p>
        </div>
    )
}

export default Spinner