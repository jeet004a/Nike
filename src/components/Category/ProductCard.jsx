import React, { useState } from 'react'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
const ProductCard = ({ product }) => {
    const [wishlisted, setWishlisted] = useState(false)
    const [hovered, setHovered] = useState(false)

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null

    return (
        <div
            className="group relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-[#F5F5F5] rounded-lg aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                {product.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full
            ${product.badge === 'Sale' ? 'bg-red-500 text-white' :
                            product.badge === 'Bestseller' ? 'bg-orange-400 text-white' :
                                'bg-black text-white'}`}>
                        {product.badge}
                    </span>
                )}

                {/* Wishlist */}
                <button
                    onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted) }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm
            opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                >
                    {wishlisted
                        ? <IoIosHeart className="text-xl text-red-500" />
                        : <IoIosHeartEmpty className="text-xl text-black" />}
                </button>

                {/* Quick Add Button */}
                <div className={`absolute bottom-0 left-0 right-0 bg-white py-3 text-center text-sm font-medium
          tracking-wide transition-all duration-300 rounded-b-lg
          ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    Quick Add
                </div>
            </div>

            {/* Info */}
            <div className="mt-3 px-0.5">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-black leading-snug line-clamp-2 flex-1">
                        {product.name}
                    </h3>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{product.color}</p>
                <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm font-semibold text-black">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                        <>
                            <span className="text-xs text-gray-400 line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-red-500 font-medium">
                                {discount}% Off
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default ProductCard;