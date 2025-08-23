import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Products from './Products';
import Filter from './Filter'
import { useState } from 'react';


//food loader function//
export async function foodItemsLoader() {
 try{

   const isAuthed = localStorage.getItem("auth") === "true";
   if (!isAuthed) {
     throw redirect("/login");
   }
   const resp = await axios.get("http://localhost:5000/foods");
    return resp.data
 }catch(error){
    throw new Response("failed to load items",{
      status:error.response?.status || 500
    });
 }
}

const Home = () => {

  const foods = useLoaderData()
  const [filter, setFilter] =useState("")
   const [ratingFilter, setRatingFilter] = useState("all");
  const [priceSort, setPriceSort] = useState(""); // high | low


  let filterFood = foods.filter((item)=>{
      
      // search 
     const matchesText = item.name.toLowerCase().includes(filter.toLowerCase())
      //rating
      let matchesRating = true;
      if (ratingFilter === "4") matchesRating = item.rating >= 4;
      if (ratingFilter === "3") matchesRating = item.rating >= 3;
      return matchesText && matchesRating;
    
  }).sort((a,b)=>{
    if(priceSort=='high-to-low'){
       return b.price - a.price;
    }else if(priceSort=='low-to-high'){
      return a.price-b.price
    }
    return 0;//default
  })

  

  return (
   

     <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Food Menu</h1>
      <Filter filter={filter} setFilter={setFilter} 
            ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
            priceSort={priceSort} setPriceSort ={setPriceSort}/>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterFood.map((item) => (
          <Products key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Home