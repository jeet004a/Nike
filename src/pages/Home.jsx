import React from 'react'
import NavBar from '../components/Navigation/NavBar'
import Video from '../components/Home/Video'
import Footer from '../components/Navigation/Footer'

const Home = () => {
    return (
        <div className=' w-screen h-screen relative flex flex-col overflow-x-hidden bg-[#1D1D1D]'>
            <NavBar />
            <div className=' flex items-center justify-center '>
                <div className='w-[90vw] h-[40vw] bg-blue-500'>
                    <Video />
                </div>
            </div>
            <div className=' flex items-center justify-center'>
                <div className='w-[90vw] h-[40vw] bg-blue-500 flex flex-row object-cover'>
                    <img className='h-full w-1/3' src="/IMG 1.avif" alt="" />
                    <img className='h-full w-1/3' src="/IMG 2.avif" alt="" />
                    <img className='h-full w-1/3' src="/IMG 3.avif" alt="" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home