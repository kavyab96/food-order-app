import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotals, clearAllCartItems } from "../features/cart/cartSlice";

import PaymentSuccess from "./PaymentSuccess";



const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const { subTotal } = useSelector(selectCartTotals);


    const [paymentMode, setPaymentMode] = useState("cod");
    const [upiId, setUpiId] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // total price is coming from redux / props
    const totalPrice = subTotal
    const discount = paymentMode === "upi" ? totalPrice * 0.05 : 0;
    const finalAmount = totalPrice - discount;

    const handlePay = () => {
        setIsProcessing(true);
        // payment processing delay
        setTimeout(() => {
            dispatch(clearAllCartItems())//clear cart
            setIsProcessing(false);
            setIsSuccess(true);
        }, 0);
    };

    return (
        <>

            {/* Success Message */}
            {isSuccess ? (
               
               <div className="w-[100%] h-[88vh]  bg-white dark:bg-slate-800 p-5  flex  justify-center items-center ">
                <PaymentSuccess />
                </div>

            ) : (

                <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 p-5 dark:bg-slate-800">
                    {/* Header */}
                    <div className="w-[55%] bg-slate-400 dark:bg-slate-500 p-[2rem] rounded-xl">


                        <div className="w-full flex gap-5  mb-6 ">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-gray-700 hover:text-black dark:text-white"
                            >
                                <LuArrowLeft size={20} />
                            </button>
                            <h1 className="text-2xl font-bold text-white">Payment Options</h1>
                            
                        </div>

                        {/* Address Section */}
                        <div className="w-full max-w-4xl  bg-white shadow-md rounded-lg p-4 mb-6 dark:bg-slate-700">
                            <h2 className="font-semibold text-lg mb-2">Delivery Address</h2>
                            <p className="text-gray-600">{user?.address || "No address found"}</p>
                        </div>


                        {/* Payment Options */}
                        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 mb-6 dark:bg-slate-700">
                            <h2 className="font-semibold text-lg mb-3">Choose Payment Method</h2>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="upi"
                                        checked={paymentMode === "upi"}
                                        onChange={(e) => setPaymentMode(e.target.value)}
                                    />
                                    UPI (Get 5% OFF)
                                </label>
                                <div className={` overflow-hidden transition-all duration-300 ${paymentMode === "upi" ? "max-h-20 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"}`}>

                                    <input
                                        type="text"
                                        placeholder="Enter your UPI ID"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        className="w-full border rounded-md p-2 mt-2"
                                    />
                                </div>

                                <label className="flex items-center gap-2 ">
                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={paymentMode === "cod"}
                                        onChange={(e) => setPaymentMode(e.target.value)}
                                    />
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>


                        {/* Price Section */}
                        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 mb-6 dark:bg-slate-700">
                            <h2 className="font-semibold text-lg mb-2">Price Details</h2>
                            <p className="text-gray-700 dark:text-white">Total: ₹{totalPrice}</p>
                            {discount > 0 && (
                                <p className="text-green-600 dark:text-yellow-200">Discount: -₹{discount}</p>
                            )}
                            <p className="font-bold text-gray-900 dark:text-white mt-2">Final Amount: ₹{finalAmount}</p>
                        </div>

                        {/* Pay Button */}

                        <button
                            onClick={handlePay}
                            className="w-full max-w-4xl bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                            Pay ₹{finalAmount}
                        </button>



                    </div>
                    {/* Processing Animation */}
                    {isProcessing && (

                        <div className="w-[100vw] h-[100vh] fixed top-0 bg-black/60 flex flex-col items-center justify-center">
                            <div className="animate-spin h-10 w-10 border-4 border-green-300 border-t-transparent rounded-full mb-4"></div>
                            <p className="text-gray-300 font-medium">Processing Payment...</p>
                        </div>
                    )
                    }



                </div>
            )}
        </>
    );
};

export default Checkout;
