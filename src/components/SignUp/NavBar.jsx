
import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContent';
import axios from 'axios'
const Product_API = import.meta.env.VITE_PRODUCT_API;

const NavBar = () => {

    const [active, setActive] = useState(false);
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const { cartItems } = useCart()
    const [seachItem, setSearchItems] = useState([])
    const [placeholderText, setPlaceholder] = useState("Search")
    // console.log(cartItems)
    useEffect(() => {
        let fetchQuery = async () => {
            const response = await axios.get(`http://localhost:3002/api/search?q=${query}`)

            // console.log(response.data.a)
            setSearchItems(response.data.a)
        }

        const timer = setTimeout(() => {
            fetchQuery();
        }, 1000);

        return () => clearTimeout(timer);
    }, [query])

    // console.log('nav', cartItems.length)
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
                            value={query}
                            className={`bg-transparent outline-none text-sm w-full
                            ${active ? "block" : "hidden sm:block"}`}
                            onFocus={() => setActive(true)}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                        />
                        {seachItem.length && query ? (<div className='absolute top-14 mt-6 -ml-3 sm:w-[320px] max-h-[250px] overflow-y-auto bg-white shadow-2xl rounded-2xl border border-gray-200 z-50'>

                            {
                                seachItem.map((item) => (

                                    <div
                                        key={item._id}
                                        onClick={() => {
                                            setActive(false)
                                            setQuery("")
                                            setSearchItems([])
                                            setPlaceholder("Search")
                                            navigate(`/product/${item._id}`)
                                        }}
                                        className='flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-100 transition-all duration-200 cursor-pointer'
                                    >

                                        {/* Product Image */}

                                        <div className='w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center'>

                                            <img
                                                src={item?.thumbnail}
                                                alt={item?.name}
                                                className='w-full h-full object-cover'
                                            />

                                        </div>

                                        {/* Product Details */}

                                        <div className='flex flex-col flex-1'>

                                            <h1 className='font-semibold text-sm text-gray-800 line-clamp-1'>
                                                {item?.name}
                                            </h1>

                                            <p className='text-xs text-gray-500 mt-1 capitalize'>
                                                {item?.category}
                                            </p>

                                            <h2 className='text-sm font-bold text-black mt-2'>
                                                ₹{item?.price}
                                            </h2>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                        ) : null
                        }
                    </div>

                    {/* ❌ Cancel */}
                    {active && (
                        <span
                            className="text-sm cursor-pointer hidden sm:block"
                            onClick={() => {
                                setActive(false)
                                setQuery("")
                                setSearchItems([])
                                setPlaceholder("Search")
                            }}
                        >
                            Cancel
                        </span>
                    )}

                    {/* ❤️ Wishlist */}
                    <Link to="/wishlist" className={active ? "hidden sm:block" : ""}>
                        <IoIosHeartEmpty className='text-xl lg:text-2xl' />
                    </Link>

                    {/* 🛒 Cart */}
                    <Link to='/cart' className={active ? "hidden sm:block" : ""} >
                        <IoBagOutline className='text-xl lg:text-2xl' />
                        {/* <span className='absolute w-2 h-2 bg-red-400 rounded-full -mt-2 ml-4'></span> */}
                        {cartItems.length > 0 ? <span className='absolute w-2 h-2 bg-red-400 rounded-full -mt-2 ml-4'></span>
                            : null}
                    </Link>

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