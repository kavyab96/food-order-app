import React from "react";
import { CgSquare } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQty, decrementQty } from "../features/cart/cartSlice";

const Products = ({ product }) => {



  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cartData.items)
  // console.table(cart)
  // Check if product is already in cart
  const cartItem = cart.find((item) => item.id === product.id);


  return (
    <div className="rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center w-[90%] dark:bg-gray-700">
      {/* Image */}
      <div className="w-full relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[35vh] object-cover rounded-lg mb-3 "
        />
        <div className="absolute bottom-5 left-0">
          <p className="bg-blue-500 text-white font-semibold py-[0.2rem] px-2 rounded-sm text-[.9rem]">50% OFF</p>
        </div>
      </div>

      <div className="w-full flex justify-between">
        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h2>

        {/* Price */}
        <p className="text-gray-600 dark:text-white mt-1">₹{product.price}</p>
      </div>

      <div className="w-full flex justify-between items-center mt-1">
        {/* veg/non-veg */}
        <CgSquare className={`${product.type == 'veg' ? "text-green-500" : "text-orange-500"} text-2xl`} size={20} />
        {/* rating */}
        <p
          className={`${product.rating >= 4
            ? "bg-green-400"
            : product.rating >= 3
              ? "bg-yellow-300"
              : "bg-orange-400"
            } text-white px-2 py-[0.2px] rounded w-[50px] flex justify-center items-center`}
        >{product.rating} <AiFillStar className="text-white-600" /></p>
      </div>

      {
        cartItem ? (
          <div className="bg-gray-300 flex gap-3 justify-center items-center rounded-lg">
            <button className="px-3 py-1 rounded-lg hover:bg-gray-400 "
              onClick={() => dispatch(decrementQty(product.id))} > - </button>

          <span className="font-semibold  ">{cartItem.quantity}</span>
          
            <button className="bg-gray-300 px-3 py-1 rounded-lg hover:bg-gray-400"
              onClick={() => dispatch(incrementQty(product.id))} > + </button>
          </div>
        ) :
          (
            <>
              {/*Add Button */}
              < button className="mt-2 shadow-md outline outline-[1.7px] outline-slate-300 hover:outline-none hover:bg-gradient-to-r from-orange-400 to-pink-500  hover:text-white text-dark px-2 py-2 rounded-lg  transition"
                onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>
            </>
          )
      }




    </div >
  );
};

export default Products;
