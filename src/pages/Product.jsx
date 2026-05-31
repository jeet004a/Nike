import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import NavBar from '../components/SignUp/NavBar'
import { allProducts } from '../data/products'
import Footer from '../components/Navigation/Footer'
import {
    IoIosHeartEmpty, IoIosHeart,
} from 'react-icons/io'
import {
    IoChevronDown, IoChevronUp, IoChevronBack, IoChevronForward,
    IoShareSocialOutline, IoStarSharp, IoStarHalfSharp, IoStarOutline,
    IoCheckmarkCircle, IoShieldCheckmarkOutline, IoReturnDownBackOutline,
} from 'react-icons/io5'
import { TbTruckDelivery, TbRuler } from 'react-icons/tb'
import { MdOutlineLocalShipping } from 'react-icons/md'
import ProductCardMini from '../components/Product/ProductCardMini'
import StarRating from '../components/Product/StarRating'
import Accordion from '../components/Product/Accordion'
import { getProductById } from '../api/Product/product.Api'
import { useCart } from '../context/CartContent'
import { useWishList } from '../context/WishListContext'

// ─── Main Product Page ──────────────────────────────────────────────────────────
const Product = () => {

    const { id } = useParams()
    const { cartItems, addToCart, setBagTotal, bagTotal, Totalamount, setTotalAmount } = useCart()
    const { wishListItems, setWishlistItems, addToWishList, removeFromWishList } = useWishList()

    const navigate = useNavigate()
    // const product = allProducts.find(p => p.id === Number(id))

    const [activeImg, setActiveImg] = useState(0)
    const [selectedSize, setSelectedSize] = useState(null)
    const [wishlisted, setWishlisted] = useState(false)
    const [addedToBag, setAddedToBag] = useState(false)
    const [sizeError, setSizeError] = useState(false)
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const relatedRef = useRef(null)
    const [product, setProduct] = useState(null)
    const [cartProduct, setCartProduct] = useState(null)
    useEffect(() => {
        const getData = async () => {
            const response = await getProductById(id)
            // console.log(response)
            setProduct(response.data)
        }

        getData()
    })

    // console.log(product)

    useEffect(() => {
        window.scrollTo(0, 0)
        setActiveImg(0)
        setSelectedSize(null)
        setAddedToBag(false)
        setSizeError(false)
        for (let i of wishListItems) {
            if (i._id == id) {
                setWishlisted(true)
            }
        }
    }, [id])

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                {/* <NavBar /> */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <p className="text-2xl font-bold text-gray-300">Product not found</p>
                    <button onClick={() => navigate(-1)} className="bg-black text-white px-6 py-2.5 rounded-full text-sm">
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    const related = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 6)
    const youMightLike = allProducts.filter(p => p.id !== product.id && p.gender === product.gender && p.category !== product.category).slice(0, 4)

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null

    const handleAddToBag = (e) => {
        if (!selectedSize) { setSizeError(true); return }
        setSizeError(false)
        setAddedToBag(true)
        setTimeout(() => setAddedToBag(false), 2500)
        // console.log('Added to bag clicked', product)
        product.selectSize = selectedSize
        addToCart(product)

        let total = bagTotal + product.price
        setBagTotal(total)
        setTotalAmount(total)

    }

    const scrollRelated = (dir) => {
        if (relatedRef.current) {
            relatedRef.current.scrollBy({ left: dir * 260, behavior: 'smooth' })
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* <NavBar /> */}

            {/* ── Breadcrumb ── */}
            <nav className="px-6 lg:px-12 py-3 text-xs text-gray-500 flex items-center gap-1.5">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <Link to={`/category/${product.category}`} className="hover:text-black transition-colors capitalize">{product.category}</Link>
                <span>/</span>
                <span className="text-black font-medium truncate">{product.name}</span>
            </nav>

            {/* ── Main Content ── */}
            <div className="px-6 lg:px-12 pb-16 flex flex-col lg:flex-row gap-8 lg:gap-14">

                {/* ─────── LEFT: Image Gallery ─────── */}
                <div className="lg:w-[55%] flex flex-col-reverse lg:flex-row gap-4 lg:sticky lg:top-4 lg:self-start">

                    {/* Thumbnails */}
                    <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px]
            scrollbar-hide flex-shrink-0">
                        {product.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
                  ${activeImg === i ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="flex-1 relative rounded-2xl overflow-hidden bg-[#F5F5F5] group aspect-square lg:aspect-auto lg:h-[600px]">
                        <img
                            key={activeImg}
                            src={product.images[activeImg]}
                            alt={product.name}
                            className="w-full h-full object-cover animate-fadeIn"
                            style={{ animation: 'fadeIn 0.3s ease' }}
                        />

                        {/* Prev / Next arrows */}
                        <button
                            onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full
                opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow"
                        >
                            <IoChevronBack className="text-base" />
                        </button>
                        <button
                            onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full
                opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow"
                        >
                            <IoChevronForward className="text-base" />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {product.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200
                    ${activeImg === i ? 'bg-black w-4' : 'bg-black/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─────── RIGHT: Product Info ─────── */}
                <div className="lg:w-[45%] flex flex-col">

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            {product.badge && (
                                <span className={`inline-block mb-2 px-3 py-0.5 text-xs font-semibold rounded-full
                  ${product.badge === 'Sale' ? 'bg-red-100 text-red-600'
                                        : product.badge === 'Bestseller' ? 'bg-orange-100 text-orange-600'
                                            : 'bg-black/10 text-black'}`}>
                                    {product.badge}
                                </span>
                            )}
                            <h1 className="text-2xl lg:text-3xl font-bold text-black leading-tight font-[font1]">{product.name}</h1>
                            <p className="text-gray-500 text-sm mt-1">{product.subtitle}</p>
                        </div>
                        <button
                            onClick={() => setWishlisted(!wishlisted)}
                            className="mt-1 flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            {wishlisted
                                ? <IoIosHeart className="text-2xl text-red-500" />
                                : <IoIosHeartEmpty className="text-2xl text-black" />}
                        </button>
                    </div>

                    {/* Rating */}
                    <div className="mt-2">
                        <StarRating rating={product.rating} count={product.reviewCount} />
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-3 flex-wrap">
                        <span className="text-xl font-bold text-black">
                            ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                            <>
                                <span className="text-base text-gray-400 line-through">
                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-sm font-semibold text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full">
                                    {discount}% Off
                                </span>
                            </>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Incl. of all taxes</p>

                    {/* Color */}
                    <div className="mt-5">
                        <p className="text-sm font-medium text-black mb-2">
                            Colour: <span className="font-normal text-gray-600">{product.color}</span>
                        </p>
                        <div className="flex gap-2.5">
                            {/* Show a few color swatches for demo */}
                            {[product.colorHex, '#1a1a1a', '#f0f0f0', '#cc3300'].map((hex, i) => (
                                <button
                                    key={i}
                                    className={`w-8 h-8 rounded-full border-2 transition-all duration-150
                    ${i === 0 ? 'border-black scale-110' : 'border-gray-200 hover:border-gray-400'}`}
                                    style={{ backgroundColor: hex }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-5">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-black">
                                {product.sizeType === 'shoe' ? 'Select Size (UK)' : 'Select Size'}
                            </p>
                            <button
                                onClick={() => setShowSizeGuide(!showSizeGuide)}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-black transition-colors"
                            >
                                <TbRuler className="text-sm" />
                                Size Guide
                            </button>
                        </div>

                        {/* Size Guide Tooltip */}
                        {showSizeGuide && (
                            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
                                {product.sizeType === 'shoe'
                                    ? 'UK sizing. If between sizes, we recommend going half size up.'
                                    : 'XS: 32–34" | S: 34–36" | M: 37–39" | L: 40–42" | XL: 43–45" | XXL: 46–48"'}
                            </div>
                        )}

                        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                                    className={`py-2.5 border rounded-lg text-sm font-medium transition-all duration-150
                    ${selectedSize === size
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-200 text-black hover:border-black'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        {sizeError && (
                            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
                                Please select a size.
                            </p>
                        )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            onClick={handleAddToBag}
                            className={`w-full py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300
                ${addedToBag
                                    ? 'bg-green-500 text-white'
                                    : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]'}`}
                        >
                            {addedToBag ? (
                                <span className="flex items-center justify-center gap-2">
                                    <IoCheckmarkCircle className="text-lg" />
                                    Added to Bag!
                                </span>
                            ) : 'Add to Bag'}
                        </button>

                        <button
                            onClick={() => {
                                setWishlisted(!wishlisted)
                                if (!wishlisted) {
                                    addToWishList(product)
                                }

                                if (wishlisted) {
                                    removeFromWishList(product._id)
                                }

                            }}
                            className="w-full py-4 rounded-full border border-gray-300 text-sm font-semibold tracking-wide
                hover:border-black transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {wishlisted ? <IoIosHeart className="text-lg text-red-500" /> : <IoIosHeartEmpty className="text-lg" />}
                            {wishlisted ? 'Saved to Wishlist' : 'Favourite'}
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-5 grid grid-cols-3 gap-3 border-y border-gray-100 py-4">
                        {[
                            { icon: <TbTruckDelivery className="text-xl" />, label: 'Free Delivery', sub: 'On ₹3,000+' },
                            { icon: <IoReturnDownBackOutline className="text-xl" />, label: 'Easy Returns', sub: '30 Day Policy' },
                            { icon: <IoShieldCheckmarkOutline className="text-xl" />, label: '100% Genuine', sub: 'Certified Nike' },
                        ].map((badge, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-0.5">
                                <div className="text-black mb-0.5">{badge.icon}</div>
                                <p className="text-xs font-medium text-black">{badge.label}</p>
                                <p className="text-[10px] text-gray-500">{badge.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Accordions */}
                    <div className="mt-2">
                        <Accordion title="Product Description" defaultOpen>
                            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                            {product.tags && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {product.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Accordion>

                        <Accordion title="Product Details">
                            <ul className="space-y-1.5">
                                {product.details.map((d, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-gray-300 mt-1">•</span>
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </Accordion>

                        <Accordion title="Delivery & Returns">
                            <ul className="space-y-2">
                                {product.shipping.map((s, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                        {i === 0 ? <MdOutlineLocalShipping className="text-base flex-shrink-0 text-black" />
                                            : <IoCheckmarkCircle className="text-base flex-shrink-0 text-green-500" />}
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </Accordion>
                    </div>

                    {/* Share */}
                    <button className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors self-start">
                        <IoShareSocialOutline className="text-base" />
                        Share This Product
                    </button>
                </div>
            </div>

            {/* ─────── You Might Also Like ─────── */}
            {youMightLike.length > 0 && (
                <section className="px-6 lg:px-12 pb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-black font-[font1]">You Might Also Like</h2>
                        <div className="flex gap-2">
                            <button onClick={() => scrollRelated(-1)} className="p-2 rounded-full border border-gray-200 hover:border-black transition-colors">
                                <IoChevronBack className="text-sm" />
                            </button>
                            <button onClick={() => scrollRelated(1)} className="p-2 rounded-full border border-gray-200 hover:border-black transition-colors">
                                <IoChevronForward className="text-sm" />
                            </button>
                        </div>
                    </div>
                    <div
                        ref={relatedRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible"
                    >
                        {youMightLike.map(p => <ProductCardMini key={p.id} product={p} />)}
                    </div>
                </section>
            )}

            {/* ─────── Related Products ─────── */}
            {related.length > 0 && (
                <section className="px-6 lg:px-12 pb-20 border-t border-gray-100 pt-10">
                    <h2 className="text-xl font-bold text-black font-[font1] mb-6">More Like This</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {related.map(p => (
                            <div
                                key={p.id}
                                className="group cursor-pointer"
                                onClick={() => navigate(`/product/${p.id}`)}
                            >
                                <div className="relative overflow-hidden bg-[#F5F5F5] rounded-xl aspect-square">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {p.badge && (
                                        <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-semibold rounded-full
                      ${p.badge === 'Sale' ? 'bg-red-500 text-white'
                                                : p.badge === 'Bestseller' ? 'bg-orange-400 text-white'
                                                    : 'bg-black text-white'}`}>
                                            {p.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2.5 px-0.5">
                                    <p className="text-[11px] text-gray-500">{p.subtitle}</p>
                                    <h4 className="text-sm font-medium text-black mt-0.5">{p.name}</h4>
                                    <p className="text-xs text-gray-400">{p.color}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-semibold">₹{p.price.toLocaleString('en-IN')}</span>
                                        {p.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Fade-in keyframe */}
            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.01); } to { opacity: 1; transform: scale(1); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            <Footer />
        </div>
    )
}

export default Product