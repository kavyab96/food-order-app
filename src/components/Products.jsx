import React from "react";
import { CgSquare  } from "react-icons/cg";

const Products = ({ product }) => {
  return (
    <div className=" rounded-2xl shadow-md hover:shadow-lg transition p-2 flex flex-col items-center">
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
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

        {/* Price */}
        <p className="text-gray-600 mt-1">₹{product.price}</p>
      </div>

       <div className="w-full flex justify-between items-center mt-1">
          {/* veg/non-veg */}
            <CgSquare  className={ `${product.type=='veg' ? "text-green-500":"text-orange-500"} text-2xl`} size={20} />
          {/* rating */}
          <p 
             className={`${
              product.rating >= 4
                ? "bg-green-400"
                : product.rating >= 3
                ? "bg-yellow-400"
                : "bg-orange-400"
            } text-white px-2 py-[0.2px] rounded`}
            >{product.rating}</p>
      </div>


      {/* Button */}
      <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Add to Cart
      </button>
    </div>
  );
};

export default Products;
