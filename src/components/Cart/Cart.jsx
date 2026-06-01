import React from 'react'
import { useCart } from '../../context/CartContent'
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import CartWarning from './CartWarning';
const Cart = () => {
    const { cartItems, bagTotal,
        setBagTotal,
        discountMRP,
        setDiscountMRP, setCartItems, Totalamount, setTotalAmount, discountFlag, setDiscountFlag } = useCart()

    if (cartItems.length === 0) {
        return <CartWarning />;
    }
    return (

        <div className='w-full h-full  flex  justify-around absolute'>
            {/* bg-red-500 */}
            <div className=' mt-20 w-[50%]'>
                {/* bg-blue-500 */}
                <h1 className='text-5xl font-[font4]'>Bag</h1>


                {
                    cartItems.length > 0 ?
                        cartItems.map((item) =>
                        (
                            <div key={`${item._id}-${item.selectSize}`}
                                className='bg-[#F5F5F5] w-[70%] h-[28%] mx-15  rounded-2xl flex items-center justify-around mt-10'>
                                {/* bg-yellow-100 */}
                                <div className=' h-[94%] gap-5 mt-5'>
                                    {/* bg-green-400 */}
                                    <img className='w-[10vw] h-[10vw] flex  rounded-3xl' src={item?.thumbnail} alt="" />
                                    {/* bg-red-400 */}
                                    <div className='w-[80%] h-[14%]  mt-3 flex items-center mx-2 justify-around text-xl'>
                                        {/* bg-blue-400 */}
                                        <RiDeleteBinLine onClick={() => {
                                            setCartItems((prev) =>
                                                prev
                                                    .map((items) =>
                                                        items._id === item._id &&
                                                            items.selectSize === item.selectSize
                                                            ? {
                                                                ...items,
                                                                count: items.count - 1
                                                            }
                                                            : items
                                                    )
                                                    .filter((items) => items.count > 0)
                                            );
                                            let total = bagTotal - item?.price
                                            setBagTotal(total)
                                            setTotalAmount(total)
                                            if (total < 20000 && discountFlag == true) {
                                                setDiscountMRP(0)
                                                // total = total + 1000
                                                setTotalAmount(total)
                                                setDiscountFlag(false)
                                            }

                                        }} />
                                        <h1>{item?.count}</h1>
                                        <CiCirclePlus onClick={() => {
                                            setCartItems((prev) =>
                                                prev
                                                    .map((items) =>
                                                        items._id === item._id &&
                                                            items.selectSize === item.selectSize
                                                            ? {
                                                                ...items,
                                                                count: items.count + 1
                                                            }
                                                            : items
                                                    )
                                                    .filter((items) => items.count > 0)
                                            );
                                            let total = bagTotal + item?.price
                                            setBagTotal(total)
                                            setTotalAmount(total)
                                            if (total > 20000 && !discountFlag) {
                                                let Damount = total - 1000
                                                setDiscountMRP(1000)
                                                setTotalAmount(Damount)
                                                setDiscountFlag(true)
                                            }
                                        }} />
                                    </div>

                                </div>
                                <div className='gap-6'>
                                    <h1 className='text-2xl'>{item?.name}</h1>
                                    <h1 className='text-sm'>{item?.category}</h1>
                                    <h1 className='text-sm'>{item?.color}</h1>
                                    <h1 className='text-sm underline'>{item?.selectSize}</h1>
                                    <h1 className='text-sm  mt-5'>₹ {item?.price}</h1>
                                </div>

                            </div>
                        )
                        )

                        : null
                }



            </div>
            <div className=' mt-20 w-[20%]'>
                {/* bg-yellow-200 */}
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
                        <h1 className='text-green-500'>Free</h1>
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

export default Cart