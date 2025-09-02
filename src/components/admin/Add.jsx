import React from 'react'
import { LuX } from "react-icons/lu";
import { useState } from 'react';
import { toast } from "react-toastify"; 



const Add = ({ addItemModal, setAddItemModal, addNewItem }) => {

    const [item, setItem] = useState({ id: "", name: "", category: "", type: "", price: "", rating: "", image: null, description: "" })
    const [errors, setErrors] = useState({ id: "", name: "", category: "", type: "", price: "", rating: "", image: "", description: "" });

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            const file = files[0];
            setItem({ ...item, image: URL.createObjectURL(file) });
            // setItem({ ...item, image: files[0] });
        } else {
            setItem({ ...item, [name]: value });
        }
        setErrors({ ...errors, [name]: "" })
    }

    function handleSubmit(e) {
        e.preventDefault();
        let valid = true;
        let tempErrors = { name: "", category: "", type: "", price: "", rating: "", image: "", description: "" }


        const lettersOnly = /^[A-Za-z\s]+$/;

        if (!item.name.trim()) {
            tempErrors.name = "Item name is required"
            valid = false
        } else if (!lettersOnly.test(item.name.trim())) {
            tempErrors.name = "Name can only contain letters and spaces";
            valid = false;
        }

        if (!item.category.trim()) {
            tempErrors.category = "category is required"
            valid = false
        } else if (!lettersOnly.test(item.category.trim())) {
            tempErrors.category = "Category can only contain letters and spaces";
            valid = false;
        }

        if (!item.type.trim()) {
            tempErrors.type = "Item Type is required"
            valid = false
        }
        if (!item.price.trim()) {
            tempErrors.price = "Item price is required"
            valid = false
        }
        if (!item.rating.trim()) {
            tempErrors.rating = "Item rating is required"
            valid = false
        }else if(item.rating.trim()<1 || item.rating.trim()>5){
            tempErrors.rating ="Item rating must be a number between 1 and 5";
            valid = false
        }
        if (!item.image) { tempErrors.image = "Image is required"; valid = false; }


        setErrors(tempErrors)
        if (valid) {
            addNewItem(item); // <-- call parent function
            toast.success("item added");

        } else {
           
            toast.error("Failed to add Item");
        }
    }

    function handleClose() {
        setAddItemModal(false);
        setItem({ name: "", category: "", type: "veg", price: "", rating: "", image: null, description: "" });
        setErrors({ name: "", category: "", type: "", price: "", rating: "", image: "", description: "" });

    }
    return (
        <>
            {
                addItemModal && (
                    <div
                        // onClick={handleClose}
                        className='  bg-black/50 fixed inset-0 z-40'
                    ></div>
                )
            }


            <div className={`h-screen w-full md:w-1/2 bg-white fixed top-0 right-0 z-50 transform transition-transform duration-500 
                    ${addItemModal ? "translate-x-0" : "translate-x-full"}  `}>


                {/* dialog close button  */}
                <button onClick={handleClose} className='bg-white/20 backdrop-blur-md hover:bg-white/50 transition px-2 py-2 rounded-md fixed top-0 left-0' >
                    <LuX size={20} className="text-slate-800" /> </button>
                {/* dialog close button  */}

                {/* Title */}
                <div className='w-[100%] h-[100%] flex justify-center'>
                    <form action="" className='w-[80%] p-2 flex flex-col items-start gap-4 mt-10' onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-6">Add Item</h1>


                        <div className='w-[100%] grid grid-cols-2 gap-2'>
                            {/* Name */}
                            <div className='flex flex-col'>
                                <label>Name <span className='text-red-500'>*</span></label>
                                <input type="text" name="name" className='rounded-lg p-3 border-2'
                                    value={item.name} onChange={handleChange} />
                                {errors.name && <p className='text-red-600 text-sm'>{errors.name}</p>}
                            </div>

                            {/* Category */}
                            <div className='flex flex-col'>
                                <label>Category <span className='text-red-500'>*</span></label>
                                <input type="text" name="category" className='rounded-lg p-3 border-2'
                                    value={item.category} onChange={handleChange} />
                                {errors.category && <p className='text-red-600 text-sm'>{errors.category}</p>}
                            </div>


                            {/* Type */}
                            <div className='flex flex-col'>
                                <label>Type <span className='text-red-500'>*</span></label>
                                <select name="type" className='rounded-lg p-3 border-2' value={item.type} onChange={handleChange}>
                                    <option value="" disabled>Select Type</option>
                                    <option value="veg">Veg</option>
                                    <option value="non-veg">Non-Veg</option>
                                </select>
                                {errors.type && <p className='text-red-600 text-sm'>{errors.type}</p>}
                            </div>

                            {/* Price */}
                            <div className='flex flex-col'>
                                <label>Price <span className='text-red-500'>*</span></label>
                                <input type="number" name="price" className='rounded-lg p-3 border-2'
                                    value={item.price} onChange={handleChange} />
                                {errors.price && <p className='text-red-600 text-sm'>{errors.price}</p>}
                            </div>

                            {/* Rating */}
                            <div className='flex flex-col'>
                                <label>Rating <span className='text-red-500'>*</span></label>
                                <input type="number" name="rating" className='rounded-lg p-3 border-2'
                                    value={item.rating} onChange={handleChange} />
                                {errors.rating && <p className='text-red-600 text-sm'>{errors.rating}</p>}
                            </div>

                            {/* Description */}
                            <div className='flex flex-col'>
                                <label>Description (Optional)</label>
                                <textarea name="description" className='rounded-lg border-2'
                                    value={item.description} onChange={handleChange} />
                            </div>

                            {/* Image Upload */}
                            <div className='flex flex-col '>
                                <label>Image <span className='text-red-500'>*</span></label>
                                <input type="file" name="image" accept="image/*" onChange={handleChange} />
                                {errors.image && <p className='text-red-600 text-sm'>{errors.image}</p>}


                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt="Preview"
                                        className="mt-2 w-32 h-32 object-cover rounded-lg border"
                                    />
                                )}
                            </div>


                            



                        </div>

                        <div className='w-[100%] grid grid-cols-2 justify-items-center mt-5 '>
                            <button type="submit" className='w-[75%] p-[5px] py-2 border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] bg-red-400 hover:bg-red-600 hover:text-white'>Cancel</button>
                            <button type="submit" className='w-[75%] p-[5px] py-2 border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] bg-green-500 hover:bg-green-700 hover:text-white'>Add Item</button>
                        </div>


                    </form>
                </div>

                {/* <div className='fixed top-6 left-[-10px] non bg-slate-400' > */}
                {/* <img src="images/indian-food.webp" alt="image" className='w-[30%] sm:w-[30%] md:w-[20%] fixed top-4 sm:right-[4rem] right:[1rem] ' /> */}
                {/* </div> */}


            </div>

        </>
    )
}

export default Add