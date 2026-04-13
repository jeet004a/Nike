import React from 'react'

const Footer = () => {
    return (
        // <div className='flex items-center justify-start text-[#7C7C7E] font-[font1] gap-10  ml-10 mt-10'>
        //     <div>© 2026 Nike, Inc. All rights reserved</div>
        //     <div>Terms of Use</div>
        //     <div>Nike Privacy Policy</div>
        //     <div>Store Claim Policy</div>
        // </div>

        <div className="mt-10 flex items-center flex-col">
            <div className="w-[90vw] h-px bg-[#3A3A3C] mb-6"></div>

            <div className='flex items-center justify-start text-[#7C7C7E] font-[font1] gap-10 ml-10'>
                <div>© 2026 Nike, Inc. All rights reserved</div>
                <div>Terms of Use</div>
                <div>Nike Privacy Policy</div>
                <div>Store Claim Policy</div>
            </div>
            <div className='mt-10'>

            </div>
        </div>
    )
}

export default Footer