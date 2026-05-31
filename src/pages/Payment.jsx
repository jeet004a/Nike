import React from 'react'
import PaymentNav from '../components/Payment/PaymentNav'
import OrderAddress from '../components/Payment/OrderAddress'

const Payment = () => {

    console.log(localStorage.user)
    return (
        <div className='w-screen h-screen'>
            <PaymentNav />
            <div className='w-full border-t-2 border-[#EBEBEB]'></div>
            <OrderAddress />
        </div>
    )
}

export default Payment