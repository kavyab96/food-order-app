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
      {/* <h1 className="text-2xl font-bold ">Your Cart</h1> */}
      {
        cartItems.length === 0 ? (
          <>
            <div className='w-[100%] h-[100vh] flex items-center justify-center relative'>
              <img src="/images/emptycart.png" alt="empty cart" className='w-[25%] absolute top-[20%]' />
              <Link to="/home" className='bg-green-300 hover:bg-[#38d579] text-white text-[1.1rem] font-bold p-3 rounded-lg absolute bottom-[39%]'>Back to Home</Link>

              {/* <p>Your cart is empty.</p> */}
            </div>
          </>
        ) :
          (
            <div className='w-[100%] h-[100vh] flex items-center justify-around  gap-3  p-5'>


              <div className="  w-[55%]  h-[90%] flex flex-col gap-2  p-6 bg-slate-400 rounded-lg">

                {/* cart div start */}
                <div className='w-[100% h-[100%] overflow-y-auto flex flex-col gap-2 p-5'>
                  {cartItems.map((item, index) => (
                    <>
                      <div className=" w-[100%] ">
                        <CartItem key={index} item={item} />
                      </div>
                    </>
                  ))}
                  {/* cart div end */}
                </div>

                <div className='w-[100%] px-5'>

                  {/* bill start  */}
                  <BillDetail />
                  {/* bill start  */}
                </div>
              </div>


              {/* ProceedToPay starts  */}
              <div className="w-[40%] h-[90%] text-center bg-slate-400 rounded-lg ">
                <ProceedToPay />
              </div>
              {/* ProceedToPay ends */}

            </div>
          )
      }
    </div>
  );
};

export default Cart