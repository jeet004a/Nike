import React, { useState, useEffect, useRef } from 'react'
import {
    IoChevronDown, IoChevronUp, IoChevronBack, IoChevronForward,
    IoShareSocialOutline, IoStarSharp, IoStarHalfSharp, IoStarOutline,
    IoCheckmarkCircle, IoShieldCheckmarkOutline, IoReturnDownBackOutline,
} from 'react-icons/io5'

const Accordion = ({ title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="border-t border-gray-200 py-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between text-sm font-medium text-black tracking-wide py-1"
            >
                {title}
                {open ? <IoChevronUp className="text-base text-gray-500" /> : <IoChevronDown className="text-base text-gray-500" />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>


        </div>
    )
}

export default Accordion