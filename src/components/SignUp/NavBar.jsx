
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <div className='w-full min-h-[60px] bg-[#FFFFFF] text-black flex items-center justify-between px-4 lg:px-10'>

                {/* 🔹 Logo */}
                <div>
                    <img
                        onClick={() => navigate('/')}
                        className='w-10 h-10 lg:w-14 lg:h-14 cursor-pointer'
                        src="https://prod-assets.nike.in/NIKE/nes-nike-reloaded-svc/static/assets/images/nike-logo-192x192.svg"
                        alt="Nike IMG"
                    />
                </div>

                {/* 🔹 Menu */}
                <div className={`lg:ml-[13vw] hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base ${active ? "opacity-0 pointer-events-none" : ""}`}>
                    <a className='cursor-pointer' onClick={() => navigate('/category/new-featured')}>New & Featured</a>
                    <a className='cursor-pointer' onClick={() => navigate('/category/men')}>Men</a>
                    <a className='cursor-pointer' onClick={() => navigate('/category/women')}>Women</a>
                    <a className='cursor-pointer' onClick={() => navigate('/category/kids')}>Kids</a>
                    <a className='cursor-pointer' onClick={() => navigate('/category/jordan')}>Jordan</a>
                </div>

                {/* 🔹 Right Section */}
                <div className='flex items-center gap-4 lg:gap-6'>

                    {/* 🔍 Search */}
                    <div className={`flex items-center gap-2 rounded-full px-3 py-1 bg-[#F5F5F5] transition-all duration-300 
                    ${active ? "w-[200px] lg:w-[300px]" : "w-auto cursor-pointer"}`}
                    >
                        <CiSearch className="text-xl" />

                        <input
                            type="text"
                            placeholder="Search"
                            className={`bg-transparent outline-none text-sm w-full 
                            ${active ? "block" : "hidden sm:block"}`}
                            onFocus={() => setActive(true)}
                        />
                    </div>

                    {/* ❌ Cancel */}
                    {active && (
                        <span
                            className="text-sm cursor-pointer hidden sm:block"
                            onClick={() => setActive(false)}
                        >
                            Cancel
                        </span>
                    )}

                    {/* ❤️ Wishlist */}
                    <a href="" className={active ? "hidden sm:block" : ""}>
                        <IoIosHeartEmpty className='text-xl lg:text-2xl' />
                    </a>

                    {/* 🛒 Cart */}
                    <a href="" className={active ? "hidden sm:block" : ""}>
                        <IoBagOutline className='text-xl lg:text-2xl' />
                    </a>

                </div>

            </div>
            <div className='w-full min-h-[60px] bg-[#F5F5F5] text-black flex flex-col items-center justify-center px-4 lg:px-10'>
                <p className='text-sm'>Get Free Delivery in 2-4 days. Easy Returns & Size Exchanges.</p>
                <a className='text-sm underline'>Shop Now</a>
            </div>
        </div>
    )
}

export default NavBar