import React, { useState } from 'react'
import { IoClose, IoChevronDown, IoChevronUp, IoGridOutline } from 'react-icons/io5'
const FilterAccordion = ({ section, selectedFilters, onToggle }) => {
    const [open, setOpen] = useState(true)
    // console.log(section.options)
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between text-sm font-medium text-black tracking-wide uppercase"
            >
                {section.label}
                {open ? <IoChevronUp className="text-base" /> : <IoChevronDown className="text-base" />}
            </button>

            {open && (
                <div className={`mt-3 flex flex-col gap-2 ${section.id === 'size' ? 'flex-row flex-wrap gap-2' : ''}`}>
                    {section.id === 'size' ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                            {section.options.map(opt => {
                                const active = selectedFilters[section.id]?.includes(opt)
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => onToggle(section.id, opt)}
                                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200
                      ${active
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-black'}`}
                                    >
                                        {opt}
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        section.options.map(opt => {
                            const active = selectedFilters[section.id]?.includes(opt)
                            return (
                                <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                                    <div
                                        onClick={() => onToggle(section.id, opt)}
                                        className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all duration-150 flex-shrink-0
                      ${active ? 'bg-black border-black' : 'border-gray-400 group-hover:border-black'}`}
                                    >
                                        {active && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-700 group-hover:text-black transition-colors">{opt}</span>
                                </label>
                            )
                        })
                    )}
                </div>
            )}
        </div>
    )
}


export default FilterAccordion