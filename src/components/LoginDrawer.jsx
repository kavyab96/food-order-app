import React, { useState } from 'react'
import { LuX } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { toast } from "react-toastify"; // 
// import "react-toastify/dist/ReactToastify.css";

const LoginDrawer = ({ showLoginDrawer, setShowLoginDrawer }) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ email: "", password: "" });

    function handleChange(e) {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setErrors({ ...errors, [name]: "" })
    }
    function handleSubmit(e) {
        e.preventDefault();
        let valid = true;
        let tempErrors = { email: "", password: "" }

        if (!user.email.trim()) {
            tempErrors.email = "Email is required"
            valid = false
        }
        if (!user.password.trim()) {
            tempErrors.password = "Password is required"
            valid = false
        } else if (user.password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters";
            valid = false;
        } else if (user.password.length > 20) {
            tempErrors.password = "Password cannot exceed 20 characters";
            valid = false;
        }

        setErrors(tempErrors)
        if (valid) {
            const storeUsers = JSON.parse(localStorage.getItem("users")) || []
            const matchUser = storeUsers.find(u => u.email === user.email && u.password === user.password)
            if (matchUser) {
                // Update Redux authentication state:
                dispatch(login(matchUser));

                handleClose();
                toast.success("Login successful");

            } else {
                toast.error("Invalid email or password");
            }

        }

    }

    function handleClose() {
        setShowLoginDrawer(false);
        // reset form & errors when drawer closes
        setUser({ email: "", password: "" });
        setErrors({ email: "", password: "" });
    }

    return (
        <>
            {
                showLoginDrawer && (
                    <div
                        // onClick={handleClose}
                        className='  bg-black/50 fixed inset-0 z-40'
                    ></div>
                )
            }

            
            <div className={`h-screen w-full md:w-1/2 bg-white fixed top-0 right-0 z-50 transform transition-transform duration-500 
                ${showLoginDrawer ? "translate-x-0" : "translate-x-full"}  `}>


                {/* dialog close button  */}
                <button onClick={handleClose} className='bg-white/20 backdrop-blur-md hover:bg-white/50 transition px-2 py-2 rounded-md fixed top-0 left-0' >
                    <LuX size={20} className="text-slate-800" /> </button>
                {/* dialog close button  */}

                {/* Title */}
                <div className='w-[100%] h-[100%] flex justify-center'>
                    <form action="" className='w-[80%] p-5 flex flex-col items-start gap-5 mt-10' onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                        <div className=' w-[70%] flex flex-col text-start'>
                            <label htmlFor="email">Email <span className='text-red-500'>*</span></label>
                            <input type="email" id='email' name="email" className='rounded-lg p-[8px] border-2'
                                required
                                value={user.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-600 text-[14px]">{errors.email}</p>}

                        </div>

                        <div className='w-[70%] flex flex-col text-start'>
                            <label htmlFor="password">Password <span className='text-red-500'>*</span></label>
                            <input type="password" id='password' className='rounded-lg p-[8px] border-2' name='password'
                                maxLength="20"
                                minLength="8"
                                required
                                value={user.password}
                                onChange={handleChange} />
                        </div>
                        {errors.password && <p className="text-red-600 text-[14px]">{errors.password}</p>}

                        <button type="submit" className='w-[70%] p-[5px] py-2 border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] bg-green-500 hover:bg-gradient-to-r from-orange-400 to-pink-500 hover:text-white'>Login</button>


                    </form>
                </div>

                <div className='fixed top-10 right-10' >
                    <img src="images/indian-food.webp" alt="image" width={150} />
                </div>


            </div>

        </>
    )
}

export default LoginDrawer