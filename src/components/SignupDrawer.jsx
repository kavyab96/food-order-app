import React, { useState } from 'react'
import { LuX } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const SignupDrawer = ({ signupDrawer, setSignupDrawer }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    })


    const [errors, setErrors] = useState({});
    const validate = () => {
        let newErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const addressRegex = /^[A-Za-z\s,]+$/;
        const phoneRegex = /^[0-9]{8,13}$/;
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = "Name should contain only letters and spaces."
        }

        //password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        } else if (!addressRegex.test(formData.address)) {
            newErrors.address = "Address can contain only letters, spaces, and commas.";
        } else if (formData.address.length > 100) {
            newErrors.address = "Address should not exceed 100 characters.";
        }

        // Phone number validation
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number must be 8 to 13 digits with no spaces or special characters.";
        }

        return newErrors;
    }
    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            const users = JSON.parse(localStorage.getItem("users")) || [];

            //email checking//
            const emailExists = users.find((u) => u.email === formData.email);
            if (emailExists) {
                setErrors({ email: "Email already registered" });
                return
            }
            // email checking 

            users.push(formData);
            localStorage.setItem("users", JSON.stringify(users));
            alert(`User Registered Successfully`, formData);
            // reseting formData 
            handleClose();
            // reseting formData 
        }


    }



    function handleClose() {
        setSignupDrawer(false);
        // reset form & errors when drawer closes
        setFormData({ name: "", password: "", email: "", address: "", phone: "" })
        setErrors({});

    }

    return (
        <>
            {
                signupDrawer && (
                    <div
                        // onClick={handleClose}
                        className='  bg-black/50 fixed inset-0 z-40'
                    ></div>
                )
            }


            <div className={`h-screen w-[40%] bg-white fixed top-0 right-0 z-50 transform transition-transform duration-500 
                ${signupDrawer ? "translate-x-0" : "translate-x-full"}  `}>


                {/* dialog close button  */}
                <button onClick={handleClose} className='bg-white/20 backdrop-blur-md hover:bg-white/50 transition px-2 py-2 rounded-md fixed top-0 left-0' >
                    <LuX size={20} className="text-slate-800" /> </button>
                {/* dialog close button  */}

                {/* Title */}
                <div className='w-[100%] h-[100%] flex justify-center'>
                    <form action="" className='w-[80%] p-5 flex flex-col items-start gap-5 mt-10' onSubmit={handleSubmit}  >
                        <h1 className="text-2xl font-bold r mb-6">Sign up</h1>
                        <div className='w-[100%] grid grid-cols-2 gap-3 mt-5 '>
                            {/* name  */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                                <input type="text" id="name" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            {/* email  */}
                            <div>
                                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email <span className="text-red-500">*</span></label>
                                <input type="email" id="email" required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password <span className="text-red-500">*</span></label>
                                <input type="password" id="password" required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    maxLength="20"
                                    minLength="8"
                                    title="Password must be between 8 and 20 characters."
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                            </div>

                            <div>
                                <label htmlFor="phone" className='block text-sm font-medium text-gray-700'>Phone <span className="text-red-500">*</span></label>
                                <input type="tel" id="phone" required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>


                            <div>
                                <label htmlFor="address" className='block text-sm font-medium text-gray-700'>Address <span className="text-red-500">*</span></label>
                                <textarea type="address" id="address" required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    maxLength="100"
                                    title="Address should not exceed 100 characters."
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                            </div>
                        </div>

                        <button type="submit" className='w-[70%] p-[5px] py-2 border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] bg-green-500 hover:bg-gradient-to-r from-orange-400 to-pink-500 hover:text-white'>Sign up</button>


                    </form>
                </div>

                <div className='fixed top-10 right-10' >
                    <img src="/images/indian-food.webp" alt="image" width={150} />
                </div>


            </div>

        </>
    )
}

export default SignupDrawer