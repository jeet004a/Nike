import React from 'react';
import { useCart } from '../../context/CartContent';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoAdd, IoRemove } from "react-icons/io5";
import { Link } from 'react-router-dom';
import CartWarning from './CartWarning';

const Cart = () => {
    const {
        cartItems,
        bagTotal,
        discountMRP,
        setCartItems,
        Totalamount
    } = useCart();

    if (cartItems.length === 0) {
        return <CartWarning />;
    }

    return (
        <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-12 animate-fadeSlideUp">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* ── LEFT COLUMN: Cart Items List ── */}
                <div className="flex-1">
                    <h1 className="text-3xl font-[font4] font-bold text-black uppercase tracking-tight mb-8">
                        Shopping Bag
                    </h1>

                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={`${item._id}-${item.selectSize}`}
                                className="flex flex-col sm:flex-row gap-6 p-5 bg-[#F9F9F9] rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300"
                            >
                                {/* Item Image */}
                                <div className="w-full sm:w-32 h-32 bg-[#F5F5F5] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={item?.thumbnail}
                                        alt={item?.name}
                                    />
                                </div>

                                {/* Item Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-4">
                                            <h2 className="text-lg font-bold text-black font-[font1] line-clamp-1">
                                                {item?.name}
                                            </h2>
                                            <span className="text-lg font-semibold text-black font-[font3] whitespace-nowrap">
                                                ₹ {item?.price?.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 capitalize mt-1 font-[font2]">
                                            {item?.category}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5 font-[font2]">
                                            Colour: {item?.color}
                                        </p>
                                        <p className="text-xs text-gray-700 mt-2 font-[font2] flex items-center gap-1.5">
                                            Size:
                                            <span className="font-bold border border-gray-300 rounded px-2 py-0.5 text-black bg-white text-[11px]">
                                                {item?.selectSize}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center mt-6">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 shadow-sm">
                                            <button
                                                onClick={() => {
                                                    setCartItems((prev) =>
                                                        prev
                                                            .map((items) =>
                                                                items._id === item._id &&
                                                                    items.selectSize === item.selectSize
                                                                    ? { ...items, count: items.count - 1 }
                                                                    : items
                                                            )
                                                            .filter((items) => items.count > 0)
                                                    );
                                                }}
                                                className="text-gray-400 hover:text-black transition-colors cursor-pointer flex items-center justify-center"
                                                title="Decrease Quantity"
                                            >
                                                <IoRemove className="text-base" />
                                            </button>
                                            <span className="text-sm font-semibold text-black min-w-[12px] text-center font-[font3]">
                                                {item?.count}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    setCartItems((prev) =>
                                                        prev.map((items) =>
                                                            items._id === item._id &&
                                                                items.selectSize === item.selectSize
                                                                ? { ...items, count: items.count + 1 }
                                                                : items
                                                        )
                                                    );
                                                }}
                                                className="text-gray-400 hover:text-black transition-colors cursor-pointer flex items-center justify-center"
                                                title="Increase Quantity"
                                            >
                                                <IoAdd className="text-base" />
                                            </button>
                                        </div>

                                        {/* Delete Action */}
                                        <button
                                            onClick={() => {
                                                setCartItems((prev) =>
                                                    prev.filter((items) =>
                                                        !(items._id === item._id && items.selectSize === item.selectSize)
                                                    )
                                                );
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-2.5 rounded-full hover:bg-red-50 cursor-pointer"
                                            title="Delete Item"
                                        >
                                            <RiDeleteBinLine className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT COLUMN: Order Summary ── */}
                <div className="w-full lg:w-[380px] flex flex-col gap-6">
                    <div className="bg-[#F9F9F9] rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-[font4] font-bold text-black uppercase tracking-tight mb-6 pb-4 border-b border-gray-200">
                            Summary
                        </h2>

                        <div className="space-y-4 font-[font2]">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold text-black font-[font3]">
                                    ₹ {bagTotal?.toLocaleString('en-IN')}
                                </span>
                            </div>

                            {discountMRP > 0 && (
                                <div className="flex items-center justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span className="font-semibold font-[font3]">
                                        -₹ {discountMRP?.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>Estimated Delivery & Handling</span>
                                <span className="text-green-600 font-semibold uppercase text-xs">
                                    Free
                                </span>
                            </div>

                            <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-black font-bold text-lg font-[font1]">
                                <span>Total</span>
                                <span className="font-[font3]">
                                    ₹ {Totalamount?.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>

                        <Link
                            to="/payment"
                            className="block text-center w-full py-4 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg mt-8 font-[font3]"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;