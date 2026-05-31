import React, { useState } from 'react'
import NavBar from '../components/SignUp/NavBar'
import Footer from '../components/Navigation/Footer'
import { IoClose, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
// import { signUpUser } from '../api/Users/user.Api'
import { useNavigate } from 'react-router-dom'
import SignUpModal from '../components/SignUp/SignUpModel'
import SigninModel from '../components/Signin/SigninModel'

const Signin = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <div>
            {/* <NavBar /> */}

            {/* Modal */}
            {modalOpen && <SigninModel onClose={() => {
                setModalOpen(false)
                navigate('/')
            }} />}

            <div className='bg-[#FFFFFF] flex justify-center items-center flex-col'>
                <div className='flex items-center justify-center'>
                    <img src="/IMG 4.avif" alt="" />
                    <div className='mt-[10vw] flex items-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold'>
                        <h1 className='font-[font4] text-7xl uppercase'>IT'S BETTER ON NIKE.IN</h1>
                        <h5 className='font-[font2]'>Move, Shop and Celebrate with the best of Nike.</h5>
                        <button
                            id="signup-open-btn"
                            onClick={() => setModalOpen(true)}
                            className='bg-white text-black px-6 py-2 font-[font2] rounded-full mt-4 cursor-pointer hover:bg-gray-100 transition-colors font-medium text-sm'
                        >
                            Log IN
                        </button>
                    </div>
                </div>

                <div className='flex flex-col p-10'>
                    <h1 className='font-[font4] text-3xl uppercase'>Benefits</h1>
                    <div className='flex flex-row gap-3'>
                        <div className='bg-amber-100 w-1/3 cursor-pointer'>
                            <img src="/IMG 5.avif" alt="" />
                        </div>
                        <div className='bg-amber-100 w-1/3 cursor-pointer'>
                            <img src="/IMG 6.avif" alt="" />
                        </div>
                        <div className='bg-amber-100 w-1/3 cursor-pointer'>
                            <img src="/IMG 7.avif" alt="" />
                        </div>
                    </div>
                </div>

                <div className='flex w-[96%] cursor-pointer justify-center items-center flex-col mt-10 gap-7'>
                    <img src="/IMG 8.avif" alt="img 8" />
                    <img src="/IMG 9.avif" alt="img 9" />
                    <img src="/IMG 10.avif" alt="img 10" />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Signin