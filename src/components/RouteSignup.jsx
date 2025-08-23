import React from 'react'
import { NavLink, Outlet,useNavigate  } from 'react-router-dom'
import logo from "../assets/logo6.png";
import { useSelector,useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';
import { CgShoppingCart,CgHome,CgLogOff  } from "react-icons/cg";

const RouteSignup = () => {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
      console.log('auth in home page',isLoggedIn);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    function handleLogout(){
        localStorage.removeItem("auth")
        dispatch(logout())
        navigate("/")
    }

    return (
        <div>
            <header className='w-[100%] h-[12vh] text-black flex justify-center items-center shadow-md '>
                <nav className='w-[100%] h-[100%] flex items-center justify-between py-6 px-8 ' >
                    <NavLink to="/" className=""><img src={logo} width="80px" alt="logo" /> </NavLink>
                    <ul className='flex gap-3 justify-items-end'>

                        {/* after login  */}
                        {isLoggedIn ?
                            (

                                <>
                                    <li> <NavLink 
                                        title="Home"
                                        to="/home"
                                        className={
                                            ({ isActive }) => isActive
                                                ? "text-salt-800 font-semibold border-b-2 border-red-300 pb-1"
                                                : "hover:text-red-400"
                                        }
                                    > <CgHome size={24} />
                                    </NavLink></li>


                                    <li> 
                                        <NavLink 
                                            title="Cart"
                                            to="/cart"
                                            className={
                                                ({ isActive }) => isActive
                                                    ? "text-salt-800 font-semibold border-b-2 border-red-300 pb-1"
                                                    : "hover:text-red-400"
                                            }
                                            >  
                                            <CgShoppingCart size={24} />
                                        </NavLink>
                                    </li>


                                    <li> <button onClick={handleLogout}
                                    title='Logout'
                                     className="hover:text-red-400 text-salt-800 font-semibold"
                                        // className={
                                        //     ({ isActive }) => isActive
                                        //         ? "text-salt-800 font-semibold border-b-2 border-red-300 pb-1"
                                        //         : "hover:text-red-400"
                                        // }
                                    > <CgLogOff size={24}/> </button></li>
                                </>

                            ) : (<>

                                {/* before login  */}
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

                            </>)}
                    </ul>

                </nav>
            </header>

            <main className='w-[100%] h-auto'>
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

export default RouteSignup