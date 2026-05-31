import React, { useState, useRef, useEffect } from 'react'
import { CiUser } from "react-icons/ci";
import { useAuth } from '../../context/AuthContext';

const UserNavBar = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const { user } = useAuth()


    // close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className='w-screen h-8 bg-[#F5F5F5] flex justify-end'>

            <div
                className='w-[10vw] h-full mr-6 flex justify-around font-[font1] text-[0.7vw] cursor-pointer items-center relative'
                ref={menuRef}
            >
                <h1>Help</h1>

                <div className='h-3 w-[0.1vw] bg-black'></div>

                {/* User Icon */}
                <div
                    onClick={() => setOpen(!open)}
                    className="p-1 rounded-full hover:bg-white cursor-pointer transition"
                >
                    <CiUser className="text-2xl" />
                </div>

                {/* Dropdown */}
                {open && (
                    <div className="absolute right-0 top-10 w-48 bg-white shadow-lg rounded-md border z-50">
                        <div className="p-3 border-b">
                            <p className="font-semibold text-sm">{user.firstname} {user.lastname}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>

                        {/* <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            Profile
                        </button> */}

                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserNavBar