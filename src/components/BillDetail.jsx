import React from 'react'
import { useSelector } from "react-redux";
import { selectCartTotals } from "../features/cart/cartSlice";

const BillDetail = () => {
const { itemTotal, deliveryFee, subTotal } = useSelector(selectCartTotals);
   
    
    return (
        <>

            <div className='w-[100%] mt-4 p-5  rounded-lg shadow-lg bg-white  dark:bg-gray-800 '>
                <h2 className="text-[1.1rem] font-semibold">Bill Details </h2>

                <div className='w-[100%]'>

                    <div className="grid grid-cols-2 w-3/4 text-sm gap-y-2">
                        <p className="text-left">Item Total</p>
                        <p className="text-right">₹{itemTotal}</p>

                        <p className="text-left">Delivery Fee</p>
                        <p className="text-right">₹{deliveryFee}</p>
                    </div>

                    <hr className='border-neutral-400 mt-5 border-[0.5px]' />
                    <div className='grid grid-cols-2 w-3/4 font-bold text-[1.1rem] mt-2'>
                       <p className='text-left'>TO PAY</p>
                       <p  className='text-right'>₹ {subTotal}</p>

                    </div>
                    
                </div>


            </div>

        </>
    )
}

export default BillDetail