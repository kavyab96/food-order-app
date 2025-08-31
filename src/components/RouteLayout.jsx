import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from "../assets/logo6.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';
import { CgShoppingCart, CgHome, CgLogOff } from "react-icons/cg";
import { LuUser, LuUserPen, LuSunMedium, LuMoon, LuLogOut } from "react-icons/lu";
import { persistor } from '../store/store';
import { clearAllCartItems } from '../features/cart/cartSlice';
import { div } from 'framer-motion/client';


const RouteLayout = () => {

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


    const cartItems = useSelector((state) => state.cartData.items);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    function handleLogout() {
        // localStorage.removeItem("auth")
        dispatch(clearAllCartItems())
        dispatch(logout())
        persistor.purge(); // Clear persisted storage completely
        navigate("/")
    }

    return (
        <div>
            <header className='w-[100%] h-[12vh] text-black flex justify-center items-center shadow-md dark:bg-gray-900  dark:text-white'>
                <nav className='w-[100%] h-[100%] flex items-center justify-between py-6 px-8 ' >
                    <NavLink to="/" className=""><img src={logo} width="80px" alt="logo" /> </NavLink>
                    <ul className='flex gap-3 justify-items-end'>

                        {/* after login  */}



                        <li>

                            <NavLink title="Home" to="/home"
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


                        <li className='relative'>
                            <NavLink
                                title="Cart"
                                to="/cart"
                                className={
                                    ({ isActive }) => isActive
                                        ? "text-salte-800 font-semibold border-b-2 border-red-300 pb-1"
                                        : "hover:text-red-400"
                                }
                            >
                                <span className="inline-block">
                                    <CgShoppingCart size={20} />
                                    {cartCount > 0 && (
                                        <span className="absolute top-[-1rem] right-[-0.5rem] bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex justify-center items-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </span>
                            </NavLink>
                        </li>


                        {/* <li> <button onClick={handleLogout}
                                        title='Logout'
                                        className="hover:text-red-400 text-salte-800 font-semibold">

                                        <span className="inline-block">
                                            <LuLogOut size={20} />
                                        </span>
                                    </button>
                                    </li> */}


                        {
                            isLoggedIn &&
                            <li className='relative' ref={dropdownRef}>


                                <button onClick={() => setDropdown((prev) => !prev)} className="hover:text-red-400 text-salte-800 font-semibold">
                                    <span className="inline-block">
                                        <LuUser size={20} />
                                    </span>
                                </button>

                                {dropdown ?
                                    (

                                        <div className='absolute right-2 dark:bg-slate-600 dar bg-slate-200 w-[150px] flex flex-col gap-2 p-2 items-center z-10 rounded-xl' >

                                            <NavLink title="Profile" to="/profile"
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
                        }
                        {/* {
                            !isLoggedIn && (

                                <>

                                    <li>
                                        <NavLink to="/login"
                                            className={
                                                ({ isActive }) => isActive
                                                    ? "text-salt-800 font-semibold border-b-2 border-red-300 pb-1"
                                                    : "hover:text-red-400"
                                            }
                                        > Log in</NavLink>
                                    </li>

                                    <li> <NavLink to="/signup"
                                        className={
                                            ({ isActive }) => isActive
                                                ? "text-salt-800 font-semibold border-b-2 border-red-300 pb-1"
                                                : "hover:text-red-400"
                                        }
                                    > Sign up</NavLink></li>
                                </>

                            )} */}
                    </ul>

                </nav>
            </header>

            <main className='w-[100%] h-auto dark:bg-gray-800  dark:text-white'>
                <Outlet />
            </main>

            <footer className='w-[100%] h-auto p-5 bg-black text-white'>
                <p className='py-3 px-10 text-center text-wrap'>
                    By continuing past this page, you agree to our Terms of Service,
                    Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2025 © Cuisino Ltd. All rights reserved.

                </p>
            </footer>
        </div>
    )
}

export default RouteLayout