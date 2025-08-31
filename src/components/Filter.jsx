import React from 'react'
import { useState } from 'react';

const Filter = ({ filter, setFilter,ratingFilter,setRatingFilter,priceSort,setPriceSort }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="mb-6 flex justify-end gap-3">
            {/* text search  */}
            <input
                type="text"
                value={filter}   // controlled by parent
                onChange={(e) => setFilter(e.target.value)} // update parent state
                placeholder="Search food..."
                className="px-4 py-2 border rounded-lg shadow-sm 
                   focus:outline-none"
            />



            {/* sortby  */}

            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="px-4 py-2 border rounded-lg shadow-sm bg-white 
                     hover:bg-gray-100 focus:outline-none"
                >
                    Sort By
                </button>


                {
                    open && (

                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20 p-3">
                            <p className="font-semibold text-gray-700 mb-1">Rating</p>

                            <div className="flex flex-col gap-1 mb-3">

                                <label htmlFor='all' className="flex items-center gap-2">
                                    <input id='all' type="radio" value="all"
                                    checked={ratingFilter === "all"}
                                    onChange={(e)=>setRatingFilter(e.target.value)}
                                    />All
                                </label>
                                <label htmlFor="3-and-above">
                                    <input type="radio" value="3" id='3-and-above'
                                     checked={ratingFilter === "3"}
                                    onChange={(e)=>setRatingFilter(e.target.value)}
                                     /> 3.0-to-5.0
                                </label>

                                <label htmlFor="4-and-above">
                                    <input type="radio" value="4" id='4-and-above'
                                     checked={ratingFilter === "4"}
                                    onChange={(e)=>setRatingFilter(e.target.value)} /> 4.0-to-5.0
                                </label>
                            </div>


                            {/* Price Section */}
                            <p className="font-semibold text-gray-700 mb-1">Price</p>
                            <div className="flex flex-col gap-1">
                                <label htmlFor='high-to-low' className="flex items-center gap-2">
                                    <input type="radio" value="high-to-low" 
                                    checked={priceSort === "high-to-low"}
                                    onChange={(e)=>setPriceSort(e.target.value)}
                                    />
                                    High to Low
                                </label>
                                <label htmlFor='low-to-high' className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="low-to-high"
                                          checked={priceSort === "low-to-high"}
                                        onChange={(e)=>setPriceSort(e.target.value)}
                                       
                                    />
                                    Low to High
                                </label>

                            </div>

                        </div>


                    )
                }
            </div>


        </div>
    )
}

export default Filter