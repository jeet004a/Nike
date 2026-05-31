import React, { useEffect } from 'react'
// import NavBar from '../components/Navigation/NavBar'
import Video from '../components/Home/Video'
import Footer from '../components/Navigation/Footer'
import { getAllProducts } from '../api/Product/product.Api.js'
import NavBar from '../components/SignUp/NavBar.jsx'
const Home = () => {
    useEffect(() => {

        getAllProducts()
    }, [])
    return (
        <div className=' w-screen h-screen relative flex flex-col overflow-x-hidden '>
            {/* User this color code for dark -- bg-[#1D1D1D] */}
            {/* <div className='fixed'> */}
            {/* <NavBar /> */}
            {/* </div> */}
            <div className=' flex items-center justify-center '>
                <div className='w-[90vw] h-[40vw] '>
                    <Video />
                </div>
            </div>
            <div className=' flex items-center justify-center pt-2'>
                <div className='w-[90vw] h-[40vw] flex flex-row object-cover'>
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