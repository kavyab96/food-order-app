import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Products from './AdminProducts';
import Filter from '../Filter';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Add from './Add';
import Edit from './Edit';


//food loader function//
export async function foodItemsLoader() {
  try {

    // const resp = await axios.get("http://localhost:5000/foods");
    const resp = await axios.get("https://my-json-server.typicode.com/kavyab96/json-server-data/foods");
    return resp.data
  } catch (error) {
    throw new Response("failed to load items", {
      status: error.response?.status || 500
    });
  }
}

const AdminHome = () => {

  const foodsFromLoader = useLoaderData()
  let [foods, setFoods] = useState(foodsFromLoader)//for newly added items

  const [filter, setFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all");
  const [priceSort, setPriceSort] = useState(""); // high | low

  //add
  const [addItemModal, setAddItemModal] = useState(false)
  //edit
  const [editItemModal, setEditItemModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditItemModal(true);
  };



  // Add new item function
  const addNewItem = async (newItem) => {
    try {
      // Give a unique ID
      newItem.id = Date.now(); // simple unique key

      // Optional: send to JSON server
      // await axios.post("http://localhost:5000/foods", newItem)

      // Update local state to show immediately
      setFoods(prev => [newItem, ...prev]);
      console.log(foods);

      setAddItemModal(false);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }


  let filterFood = foods.filter((item) => {

    // search 
    const matchesText = item.name.toLowerCase().includes(filter.toLowerCase())
    //rating
    let matchesRating = true;
    if (ratingFilter === "4") matchesRating = item.rating >= 4;
    if (ratingFilter === "3") matchesRating = item.rating >= 3;
    return matchesText && matchesRating;

  }).sort((a, b) => {
    if (priceSort == 'high-to-low') {
      return b.price - a.price;
    } else if (priceSort == 'low-to-high') {
      return a.price - b.price
    }
    return 0;//default
  })

  //delete
  const handleDelete = async(id) => {
   try {
    console.log( typeof id);
    
   
    // await axios.delete(`http://localhost:5000/foods/${id}`);
    setFoods(prev => prev.filter(item => item.id !== id));
  }
    catch (error) {
      console.error("Failed to delete item:", error);
    }
  };


  //update
  const updateItem = (updatedProduct) => {
  setFoods((prevFoods) =>
    prevFoods.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    )
  );
};




  return (


    <div className="w-[100%] min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Home</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setAddItemModal(true)}
        >
          + Add Item
        </button>

        

        <Add addItemModal={addItemModal} setAddItemModal={setAddItemModal} addNewItem={addNewItem} />
        <Edit editItemModal={editItemModal} setEditItemModal={setEditItemModal} product={selectedProduct} updateItem={updateItem} />

        <Filter filter={filter} setFilter={setFilter}
          ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
          priceSort={priceSort} setPriceSort={setPriceSort} />
      </div>

      <div className=" grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        {filterFood.map((item) => (
          <Products key={item.id} 
          product={item} 
          handleDelete={handleDelete}
          handleEditClick={handleEditClick}
           />
        ))}
      </div>
    </div >
  )
}

export default AdminHome