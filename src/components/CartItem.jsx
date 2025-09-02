import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, incrementQty, decrementQty } from "../features/cart/cartSlice";
import { FiTrash2 } from "react-icons/fi";

const CartItem = ({ item }) => {

    const dispatch = useDispatch()

    return (
        <div className="w-[100%] p-6 flex flex-col md:flex-row items-start md:items-center  justify-between border rounded-lg shadow-lg  bg-white dark:bg-gray-800">

            <div className="flex items-center justify-center gap-10 ">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                />
                <div className=" ">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>

            </div>

            <div className=" flex gap-4 flex-row ">
                <div className="bg-gray-300 dark:bg-gray-500 flex gap-3 justify-center items-center rounded-lg">
                    <button className="px-3 py-1 rounded-lg  hover:bg-gray-400 "
                        onClick={() => dispatch(decrementQty(item.id))} > - </button>

                    <span className="font-semibold  ">{item.quantity}</span>

                    <button className=" px-3 py-1 rounded-lg hover:bg-gray-400"
                        onClick={() => dispatch(incrementQty(item.id))} > + </button>
                </div>

                <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 dark:text-white dark:hover:text-red-300"
                    title="Remove Item"
                >
                    <FiTrash2 size={20} className="outline-orange-600 " />
                </button>
            </div>


        </div>
    );
};

export default CartItem;
