import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import CartItem from './CartItem';
import BillDetail from './BillDetail';
import ProceedToPay from './ProceedToPay';
import { Link } from 'react-router-dom';

const Cart = () => {

  const cartItems = useSelector((state) => state.cartData.items);
  const dispatch = useDispatch();

  return (
    <div className="p-3">
      {
        cartItems.length === 0 ? (
          <div className='w-full h-screen flex flex-col items-center justify-center relative'>
            <img
              src="images/emptycart.png"
              alt="empty cart"
              className='w-[60%] md:w-[25%] mb-5'
            />
            <Link
              to="/home"
              className='bg-green-300 hover:bg-[#38d579] text-white text-[1.1rem] font-bold px-5 py-3 rounded-lg'
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className='w-full h-automin-h-screen flex flex-col md:flex-row items-start md:items-center justify-around gap-3 p-5'>

            {/* Left: Cart + Bill */}
            <div className="w-full  md:w-[55%] md:h-[90%] flex flex-col gap-2 p-6 bg-slate-400 rounded-lg">
              
              {/* Cart Items */}
              <div className='w-full max-h-[60vh] overflow-y-auto flex flex-col gap-2 p-5'>
                {cartItems.map((item, index) => (
                  <div key={index} className="w-full">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              {/* Bill */}
              <div className='w-full px-5'>
                <BillDetail />
              </div>
            </div>

            {/* Right: Proceed To Pay */}
            <div className="w-full md:w-[40%] md:h-[90%] text-center bg-slate-400 rounded-lg p-6">
              <ProceedToPay />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Cart;
