import React from 'react'
import { useAuth } from '../../context/AuthContext'

const PaymentNav = () => {
    const { user } = useAuth()
    if (user) {
        console.log('x')
    }
    return (
        <div className='flex justify-around font-[font3]'>
            <img
                onClick={() => navigate('/')}
                className='w-10 h-10 lg:w-14 lg:h-14 cursor-pointer'
                src="https://prod-assets.nike.in/NIKE/nes-nike-reloaded-svc/static/assets/images/nike-logo-192x192.svg"
                alt="Nike IMG"
            />
            <div className=' w-[70%] flex justify-around items-center'>
                {/* bg-red-400 */}
                <div className=' flex  w-1/3 h-full items-center justify-start gap-5'>
                    {/* bg-blue-400 */}
                    {
                        user ? <img src="https://images-static.nykaa.com/media/wysiwyg/Payments/header-tick-nike-2.svg" alt="" />
                            : <h1 className='bg-[#A4AAB0] rounded-full w-10 h-10 flex items-center justify-center text-white'>1</h1>
                    }

                    Sign Up
                    <div className='w-[14vw] border-t-2 border-[#EBEBEB]'></div>
                </div>
                <div className='flex  w-1/3 h-full items-center justify-start gap-5'>
                    {/* bg-red-600 */}
                    <h1 className='bg-[#A4AAB0] rounded-full w-10 h-10 flex items-center justify-center text-white'>2</h1>
                    Address
                    <div className='w-[14vw] border-t-2 border-[#EBEBEB]'></div>
                </div>
                <div className='flex  w-1/3 h-full items-center justify-start gap-5'>
                    {/* bg-amber-300 */}
                    <h1 className='bg-[#A4AAB0] rounded-full w-10 h-10 flex items-center justify-center text-white'>3</h1>
                    Payment
                </div>
            </div>
        </div>
    )
}

export default PaymentNav