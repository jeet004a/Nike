import React from 'react'
import video from '../../../public/Pregesus.mp4'
import { useNavigate } from 'react-router-dom'
const Video = () => {
    const navigate = useNavigate();
    return (
        <div className='h-full w-full flex justify-center items-center relative'>
            <video className='h-full w-full  object-cover '
                src={video} autoPlay loop muted></video>
            <div className='flex items-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold'>
                <h5 className='font-[font2]'>Just In</h5>
                <h1 className='font-[font4] text-7xl uppercase'>Full Horsepower</h1>
                <h5 className='font-[font2]'>Pegasus 42. Full-length, curved Air Zoom. Full send.</h5>
                <button
                    onClick={() => navigate('/category/new-featured')}
                    className='bg-white text-black px-4 py-2 rounded-full mt-4 cursor-pointer'>Shop</button>
            </div>

        </div>
    )
}

export default Video