import React from 'react'
import { useCart } from '../../context/CartContent'
import { Link } from 'react-router-dom'
const OrderAddress = () => {
    const { cartItems, bagTotal,
        setBagTotal,
        discountMRP,
        setDiscountMRP, setCartItems, Totalamount, setTotalAmount, discountFlag, setDiscountFlag } = useCart()
    return (
        <div className='flex items-center justify-around h-screen mt-10'>
            <div className='mt-5  h-full'>
                <h1 className='font-[font4] text-5xl'>Choose Address</h1>
                <h1 className='text-[#707072] mt-6'>Detailed address will help our delivery partner reach your doorstep quickly</h1>
                <div
                    data-testid="add_new_address_btn"
                    className="h-40 w-[80%] mt-10 flex flex-col items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-100 transition-all"
                >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full">
                        <img
                            src="https://images-static.nykaa.com/media/wysiwyg/Payments/plus_nike.svg"
                            alt="Add"
                            className="w-4 h-4"
                        />
                    </span>

                    <div>
                        <p className="text-black  font-bold">
                            Add New Address
                        </p>
                    </div>
                </div>
            </div>
            <div
                // className=' mt-5 w-[20%]'
                className='mt-5  h-full w-[20%]'
            >
                <h1 className='text-3xl font-[font4]'>Summary</h1>
                <div className=''>
                    <div className='flex items-center justify-between mt-3'>
                        <h1>Bag Total:</h1>
                        <h1>₹ {bagTotal}</h1>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <h1>Discount on MRP:</h1>
                        <h1>-₹ {discountMRP}</h1>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <h1>Sub Total:</h1>
                        <h1>₹ {Totalamount}</h1>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <h1>Shipping Charges:</h1>
                        <h1>Free</h1>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <h1>You Pay:</h1>
                        <h1>₹ {Totalamount}</h1>
                    </div>
                    <button className='w-full h-[4vw] bg-black mt-4 text-white rounded-full cursor-pointer'>
                        <Link to='/payment' >Proceed to Pay</Link>
                    </button>

                </div>

            </div>
        </div>
    )
}

export default OrderAddress