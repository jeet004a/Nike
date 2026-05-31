import React from 'react'

const OrderAddress = () => {
    return (
        <div className='flex items-center justify-around h-screen '>
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
            <div className='mt-5 bg-red-400 h-full w-[20%]'>
                <h1>Hello</h1>
            </div>
        </div>
    )
}

export default OrderAddress