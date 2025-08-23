import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Products from './Products';
// import { useSelector } from "react-redux";

export async function foodItemsLoader() {
 try{

  //  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)  
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
  return (
   

     <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Food Menu</h1>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((item) => (
          <Products key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Home