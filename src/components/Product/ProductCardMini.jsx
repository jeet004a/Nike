import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'

const ProductCardMini = ({ product }) => {
    const navigate = useNavigate()
    const [wishlisted, setWishlisted] = useState(false)
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null
    return (
        <div
            className="group cursor-pointer shrink-0 w-[220px] lg:w-auto"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="relative overflow-hidden bg-[#F5F5F5] rounded-xl aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                    <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-semibold rounded-full
            ${product.badge === 'Sale' ? 'bg-red-500 text-white'
                            : product.badge === 'Bestseller' ? 'bg-orange-400 text-white'
                                : 'bg-black text-white'}`}>
                        {product.badge}
                    </span>
                )}
                <button
                    onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted) }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 backdrop-blur-sm
            opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                    {wishlisted
                        ? <IoIosHeart className="text-lg text-red-500" />
                        : <IoIosHeartEmpty className="text-lg text-black" />}
                </button>
            </div>
            <div className="mt-2.5 px-0.5">
                <p className="text-xs text-gray-500">{product.subtitle}</p>
                <h4 className="text-sm font-medium text-black leading-snug mt-0.5">{product.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{product.color}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                        <>
                            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                            <span className="text-xs text-red-500 font-medium">{discount}% Off</span>
                        </>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.01); } to { opacity: 1; transform: scale(1); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    )
}

export default ProductCardMini