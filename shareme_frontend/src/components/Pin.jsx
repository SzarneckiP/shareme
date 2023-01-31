import React, { useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../utils/client'
import useAuthStore from '../store/authStore'

const noImageUser = 'https://icons.veryicon.com/png/o/system/ali-mom-icon-library/random-user.png'

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
    const [postHovered, setPostHovered] = useState(false)

    const navigate = useNavigate()
    const { userProfile } = useAuthStore()

    const alreadySaved = !!(save?.filter((item) => item.postedBy?._id === userProfile?._id))?.length

    const savePin = (id) => {
        if (!alreadySaved) {

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: userProfile._id,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userProfile._id,
                    },
                }])
                .commit()
                .then(() => {
                    window.location.reload()
                })
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 easy-in-out'
            >
                <img className='rounded-lg w-full' src={urlFor(image).width(250).url()} alt="user-post" />
                {postHovered && (
                    <div
                        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={{ height: '100%' }}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold py-1 px-5 text-base rounded-3xl hover:shadow-md outline-none'
                                >
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        savePin(_id)
                                    }}
                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold py-1 px-5 text-base rounded-3xl hover:shadow-md outline-none'
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full'>
                            {destination && (
                                <a
                                    href={destination}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-1 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                                >
                                    <BsArrowUpRightCircleFill />
                                    {destination.length > 15 ? `` : destination.slice(8)}
                                </a>
                            )}
                            {postedBy?._id === userProfile?._id && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deletePin(_id)
                                    }}
                                    type='button'
                                    className='bg-white p-2 opacity-70 hover:opacity-100  font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
                <img
                    src={postedBy?.image ? postedBy?.image : noImageUser}
                    className='w-7 h-7 rounded-full object-cover'
                    alt='userImage'
                />
                <p className='font-semibold capitalize'>{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin