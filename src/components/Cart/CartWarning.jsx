import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoBagOutline } from 'react-icons/io5';

const CartWarning = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-[75vh] flex flex-col items-center justify-center px-6 py-16 text-center bg-white animate-fadeSlideUp">
            {/* Visual Icon Container with Glow & Subtle Animation */}
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-gray-100 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-28 h-28 bg-[#F5F5F5] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <IoBagOutline className="text-5xl text-black stroke-[1.5]" />
                </div>
                <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-black rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-white shadow-sm">
                    0
                </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-[font4] font-bold text-black tracking-tight mb-4 uppercase">
                Nothing added, please shop first.
            </h1>

            {/* Explanatory Text */}
            <p className="max-w-md text-gray-500 text-sm md:text-base leading-relaxed mb-10 font-[font2]">
                Your shopping bag is currently empty. Explore our latest arrivals, featured collections, or find the perfect gear for your sport and style.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md font-[font3] mb-12">
                <button
                    onClick={() => navigate('/category/new-featured')}
                    className="flex-1 px-8 py-4 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer"
                >
                    Shop New & Featured
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex-1 px-8 py-4 bg-white text-black border border-gray-300 text-sm font-semibold rounded-full hover:border-black transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                    Back to Home
                </button>
            </div>

            {/* Premium Category Quick-Links */}
            <div className="w-full max-w-lg border-t border-gray-100 pt-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 font-[font1]">
                    Popular Categories
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        { name: 'Men', path: '/category/men' },
                        { name: 'Women', path: '/category/women' },
                        { name: 'Kids', path: '/category/kids' },
                        { name: 'Jordan', path: '/category/jordan' }
                    ].map((category) => (
                        <button
                            key={category.name}
                            onClick={() => navigate(category.path)}
                            className="px-5 py-2.5 bg-gray-50 hover:bg-black hover:text-white text-xs font-semibold text-gray-800 rounded-full transition-all duration-200 border border-gray-100 hover:border-black cursor-pointer font-[font3]"
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartWarning;