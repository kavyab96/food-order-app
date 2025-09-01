import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo6.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../features/auth/authSlice';
import {  CgHome, CgLogOff } from "react-icons/cg";
import { LuUser, LuUserPen, LuSunMedium, LuMoon, LuLogOut } from "react-icons/lu";
import { persistor } from '../../store/store';
// import { clearAllCartItems } from '../../features/cart/cartSlice';



const Header = () => {

console.log('adminhader');

        //dark theme
        const [darkMode, setDarkMode] = useState(
            localStorage.getItem("theme") === "dark"
        );
    
        useEffect(() => {
            if (darkMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem('theme', 'light')
            }
        }, [darkMode])
    
        //dark theme
    
    
        // dropdown 
        const [dropdown, setDropdown] = useState(false)
    
        const dropdownRef = useRef(null)
        useEffect(() => {
            function handleOutsideClick(e) {
                if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                    setDropdown(false) // close dropdown if clicked outside
                }
            }
    
            document.addEventListener("mousedown", handleOutsideClick);
            return () => {
                document.removeEventListener("mousedown", handleOutsideClick)
            }
    
        }, [])
        // dropdown 
    
    
        // const cartItems = useSelector((state) => state.cartData.items);
        // const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
        const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    
        const navigate = useNavigate()
        const dispatch = useDispatch();
    
        function handleLogout() {
            dispatch(logout())
            persistor.purge(); // Clear persisted storage completely
            navigate("/admin/login")
        }
    
  return (
    <>
     <header className='w-[100%] h-[12vh] text-black flex justify-center items-center shadow-md dark:bg-gray-900  dark:text-white'>
                <nav className='w-[100%] h-[100%] flex items-center justify-between py-6 px-8 ' >
                    <NavLink to="/" className=""><img src={logo} width="80px" alt="logo" /> </NavLink>
                    <ul className='flex gap-3 justify-items-end'>

                        {/* after login  */}

                        {
                            isLoggedIn &&
                            <>

                            <li>

                                <NavLink title="Home" to="/admin/home"
                                    className={
                                        ({ isActive }) => isActive
                                            ? "text-salte-800 font-semibold border-b-2 border-red-300 pb-1"
                                            : "hover:text-red-400"
                                    }>
                                    <span className="inline-block">
                                        <CgHome size={20} />
                                    </span>
                                </NavLink>
                            </li>

                       
                            <li className='relative' ref={dropdownRef}>


                                <button onClick={() => setDropdown((prev) => !prev)} className="hover:text-red-400 text-salte-800 font-semibold">
                                    <span className="inline-block">
                                        <LuUser size={20} />
                                    </span>
                                </button>

                                {dropdown ?
                                    (

                                        <div className='absolute right-2 dark:bg-slate-600 dar bg-slate-200 w-[150px] flex flex-col gap-2 p-2 items-center z-10 rounded-xl' >

                                            <NavLink title="Profile" to="/admin/profile"
                                                onClick={() => {
                                                    setDropdown(false)
                                                }}
                                                className={
                                                    ({ isActive }) => isActive
                                                        ? "text-salte-800 font-semibold border-b-2 border-red-300 pb-1"
                                                        : "hover:text-red-400"
                                                }>
                                                <span className='text-[1rem] font-semibold'>Profile</span>
                                                <span className="ms-3 inline-block">
                                                    <LuUserPen size={20} />
                                                </span>
                                            </NavLink>



                                            <button
                                                onClick={() => setDarkMode(!darkMode)}
                                                className="flex items-center gap-2 px-3 py-1 hover:text-red-400 text-black "
                                            >
                                                {darkMode ? (
                                                    <>
                                                        <span className='text-[1rem] font-semibold'>Light</span>
                                                        <LuSunMedium size={20} className='ms-3' />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className='text-[1rem] font-semibold'>Dark</span>
                                                        <LuMoon size={20} className='ms-3' />
                                                    </>
                                                )}
                                            </button>


                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setDropdown(false)
                                                }}
                                                className='flex hover:text-red-400'>
                                                <span className='text-[1rem] font-semibold'>Logout</span>
                                                <span className="ms-3 inline-block">
                                                    <LuLogOut size={20} />
                                                </span>
                                            </button>

                                        </div>
                                    )
                                    : (
                                        <></>
                                    )
                                }

                            </li>
                            </>
                        }
                        

                        
                    </ul>

                </nav>
            </header>
    </>
  )
}

export default Header