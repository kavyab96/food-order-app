import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const RouteSignup = () => {
    return (
        <div>
            <header className='w-[100%] h-[12vh] bg-slate-500 text-white flex justify-center items-center'>
                <nav className=''>
                    <ul className='flex gap-3 justify-items-end'>
                        <li> <NavLink to="/" className="hidden">hero</NavLink></li>
                        <li> <NavLink to="/login"> Log in</NavLink></li>
                        <li> <NavLink to="/signup"> Sign up</NavLink></li>
                    </ul>

                </nav>
            </header>

            <main className='w-[100%] h-[88vh]'>
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