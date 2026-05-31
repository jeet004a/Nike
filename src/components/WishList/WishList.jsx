import React from 'react'
import { useCart } from '../../context/CartContent'
import { useWishList } from '../../context/WishListContext'

const WishList = () => {
    const { cartItems, bagTotal,
        setBagTotal,
        discountMRP,
        setDiscountMRP, setCartItems, Totalamount, setTotalAmount, discountFlag, setDiscountFlag } = useCart()
    const { wishListItems, setWishlistItems, removeFromWishList } = useWishList()

    // console.log(wishListItems)   

    // console.log(cartItems)
    return (
        <div className='w-full h-full  flex  justify-around  '>
            {/* bg-red-500 */}
            <div className=' mt-20 w-[50%]'>
                {/* bg-blue-500 */}
                <h1 className='text-5xl font-[font4] mb-2'>Bag</h1>
                {/* <div className='bg-[#F5F5F5] mt-10 w-full h-[15vw] border-none rounded-2xl flex items-center justify-around'>
                    <img className=' h-[12vw] border-none rounded-2xl' src={cartItems[0]?.thumbnail} alt="" />
                    <div className='h-[10vw] flex items-center flex-col justify-around'>
                        <h1 className='text-2xl'>{cartItems[0]?.name}</h1>
                        <h1 className='text-xs -mt-8'>{cartItems[0]?.category}</h1>
                        <h1 className='underline text-sm'>₹ {cartItems[0]?.price}</h1>

                    </div>
                </div> */}
                {
                    wishListItems.map((item) => (
                        <div key={`${item?._id}`} className='bg-[#F5F5F5] mt-10 w-full h-[15vw] border-none rounded-2xl flex items-center justify-around'>
                            <img className=' h-[12vw] border-none rounded-2xl' src={item?.thumbnail} alt="" />
                            <div className='h-[10vw] flex items-center flex-col justify-around'>
                                <h1 className='text-2xl'>{item?.name}</h1>
                                <h1 className='text-xs'>{item?.category}</h1>
                                <h1 className='underline text-sm'>₹ {item?.price}</h1>
                                <button onClick={() => {
                                    removeFromWishList(item._id)
                                }}
                                    className="px-6 py-2 rounded-full bg-black text-white font-semibold tracking-wide hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>


        </div>
    )
}

export default WishList