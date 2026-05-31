import React, { useState, useEffect, useMemo } from 'react'
import NavBar from '../components/SignUp/NavBar'
import { useParams, useNavigate } from 'react-router-dom'
import { IoClose, IoChevronDown, IoChevronUp, IoGridOutline } from 'react-icons/io5'
import { BsSliders2 } from 'react-icons/bs'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import FilterAccordion from '../components/Category/FilterAccordion'
import { getAllProducts } from '../api/Product/product.Api'
import { useWishList } from '../context/WishListContext'
// ─── Static price range buckets (not data-driven) ──────────────────────────────
const PRICE_RANGES = ['Under ₹1,999', '₹2,000 – ₹4,999', '₹5,000 – ₹9,999', '₹10,000 & Above']

const sortOptions = ['Featured', 'Newest', 'Price: High-Low', 'Price: Low-High']

// ─── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  // console.log('kk', product)

  const navigate = useNavigate()
  const [wishlisted, setWishlisted] = useState(false)
  // const { wishListItems, setWishlistItems, removeFromWishList } = useWishList()
  const [hovered, setHovered] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F5F5F5] rounded-xl aspect-square">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-semibold rounded-full
            ${product.badge === 'Sale' ? 'bg-red-500 text-white' :
              product.badge === 'Bestseller' ? 'bg-orange-400 text-white' :
                'bg-black text-white'}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted)
            // setWishlistItems()
            // console.log(wishlisted)
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm
            opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          {
            wishlisted
              // wishListItems
              ? <IoIosHeart className="text-xl text-red-500" />
              : <IoIosHeartEmpty className="text-xl text-black" />}
        </button>

        {/* Quick Add */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white py-3 text-center text-sm font-medium
          tracking-wide rounded-b-xl transition-all duration-300
          ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          Quick Add
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <p className="text-[11px] text-gray-500 leading-snug">{product.subtitle}</p>
        <h3 className="text-sm font-medium text-black leading-snug line-clamp-1 mt-0.5">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.color}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="text-sm font-semibold text-black">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-red-500 font-medium">{discount}% Off</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Category Page ─────────────────────────────────────────────────────────────
const Category = () => {
  const { category } = useParams()
  const [selectedFilters, setSelectedFilters] = useState({})
  const [sortBy, setSortBy] = useState('Featured')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [activeChips, setActiveChips] = useState([])

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getall() {
      try {
        const response = await getAllProducts()
        setData(response.data)
      } catch (err) {
        console.error('Failed to fetch products', err)
      } finally {
        setLoading(false)
      }
    }
    getall()
  }, [])

  // ── Derive filter sections dynamically from fetched data ──────────────────────
  const filterSections = useMemo(() => {
    if (!data.length) return []

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    const unique = (arr) => [...new Set(arr.filter(Boolean))]

    const genders = unique(data.map(p => p.gender)).map(capitalize)
    const categories = unique(data.map(p => p.category)).map(capitalize)
    const colors = unique(data.map(p => p.color))

    // Sizes: flatten all sizes arrays and sort (numbers first, then strings)
    const allSizes = unique(data.flatMap(p => p.sizes ?? []))
    // const numericSizes = allSizes.filter(s => !isNaN(s)).sort((a, b) => Number(a) - Number(b))
    const clothingSizes = allSizes.filter(s => isNaN(s))
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const numericSizes = ['6', '7', '8', '9', '10', '11']
    const sortedClothing = clothingSizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    const sizes = [...sortedClothing, ...numericSizes.map(String)]

    return [
      { id: 'gender', label: 'Gender', options: genders },
      { id: 'category', label: 'Category', options: categories },
      { id: 'price', label: 'Price', options: PRICE_RANGES },
      { id: 'size', label: 'Size', options: sizes },
      { id: 'color', label: 'Colour', options: colors },
    ]
  }, [data])

  // console.log(data[0])

  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'All Products'

  const toggleFilter = (sectionId, option) => {
    setSelectedFilters(prev => {
      const current = prev[sectionId] || []
      const updated = current.includes(option)
        ? current.filter(v => v !== option)
        : [...current, option]
      return { ...prev, [sectionId]: updated }
    })
  }

  useEffect(() => {
    const chips = []
    Object.entries(selectedFilters).forEach(([key, vals]) =>
      vals.forEach(v => chips.push({ key, value: v }))
    )
    setActiveChips(chips)
  }, [selectedFilters])

  const removeChip = (chip) =>
    setSelectedFilters(prev => ({
      ...prev,
      [chip.key]: (prev[chip.key] || []).filter(v => v !== chip.value),
    }))

  const clearAll = () => setSelectedFilters({})

  // ── Filter & Sort ──
  const filteredProducts = useMemo(() => {
    return data
      .filter(p => {
        // Gender filter
        if (selectedFilters.gender?.length &&
          !selectedFilters.gender.map(g => g.toLowerCase()).includes(p.gender?.toLowerCase()))
          return false

        // Category filter
        if (selectedFilters.category?.length &&
          !selectedFilters.category.map(c => c.toLowerCase()).includes(p.category?.toLowerCase()))
          return false

        // Price filter
        if (selectedFilters.price?.length) {
          const inRange = selectedFilters.price.some(range => {
            if (range === 'Under ₹1,999') return p.price < 2000
            if (range === '₹2,000 – ₹4,999') return p.price >= 2000 && p.price <= 4999
            if (range === '₹5,000 – ₹9,999') return p.price >= 5000 && p.price <= 9999
            if (range === '₹10,000 & Above') return p.price >= 10000
            return true
          })
          if (!inRange) return false
        }

        // Size filter
        if (selectedFilters.size?.length &&
          !selectedFilters.size.some(s => p.sizes?.map(String).includes(String(s))))
          return false

        // Colour filter
        if (selectedFilters.color?.length &&
          !selectedFilters.color.some(c => p.color?.toLowerCase().includes(c.toLowerCase())))
          return false

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'Price: High-Low') return b.price - a.price
        if (sortBy === 'Price: Low-High') return a.price - b.price
        if (sortBy === 'Newest') return new Date(b.createdAt) - new Date(a.createdAt)
        return 0
      })
  }, [data, selectedFilters, sortBy])


  return (
    <div className="min-h-screen bg-white">
      {/* <NavBar /> */}

      {/* ── Page Header ── */}
      <div className="px-6 lg:px-10 pt-6 pb-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight capitalize font-[font1]">
              {title}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{filteredProducts.length} Results</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Hide/Show Filters – desktop */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium hover:text-gray-600 transition-colors"
            >
              <TbAdjustmentsHorizontal className="text-lg" />
              {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Mobile filter */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex lg:hidden items-center gap-1.5 text-sm font-medium border border-gray-300 rounded-full px-4 py-1.5"
            >
              <BsSliders2 className="text-sm" /> Filter
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none text-sm font-medium bg-transparent border border-gray-300 rounded-full
                  px-4 pr-8 py-1.5 cursor-pointer focus:outline-none hover:border-black transition-colors"
              >
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <IoChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {activeChips.map((chip, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-black text-white text-xs px-3 py-1.5 rounded-full">
                {chip.value}
                <button onClick={() => removeChip(chip)}>
                  <IoClose className="text-sm" />
                </button>
              </span>
            ))}
            <button onClick={clearAll} className="text-xs underline text-gray-600 hover:text-black transition-colors ml-1">
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* ── Main Layout ── */}
      <div className="flex">

        {/* Sidebar */}
        <aside className={`transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden
          ${sidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
          <div className="w-64 px-6 py-5">
            {filterSections.map(section => (
              <FilterAccordion
                key={section.id}
                section={section}
                selectedFilters={selectedFilters}
                onToggle={toggleFilter}
              />
            ))}
          </div>
        </aside>

        {/* Grid */}
        <main className="flex-1 px-6 lg:px-8 py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading products…</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <IoGridOutline className="text-6xl text-gray-300" />
              <p className="text-gray-500 text-base">No products match your filters.</p>
              <button
                onClick={clearAll}
                className="bg-black text-white text-sm px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-x-5 gap-y-8
              ${sidebarOpen
                ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="w-80 max-w-full bg-white h-full overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-sm tracking-widest uppercase">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)}>
                <IoClose className="text-2xl" />
              </button>
            </div>
            <div className="px-5 py-3 flex-1">
              {filterSections.map(section => (
                <FilterAccordion
                  key={section.id}
                  section={section}
                  selectedFilters={selectedFilters}
                  onToggle={toggleFilter}
                />
              ))}
            </div>
            <div className="px-5 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-black text-white py-3 rounded-full text-sm font-medium tracking-wide"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Category