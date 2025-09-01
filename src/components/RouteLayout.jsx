
import { login, isAdmin as selectIsAdmin } from '../features/auth/authSlice';
import Header from './Header';
import { Outlet, } from 'react-router-dom'
import AdminHeader from './admin/Header';
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import { useEffect } from 'react';





const RouteLayout = () => {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); // reset scroll
    }, [pathname]);


    const isAdmin = useSelector(selectIsAdmin);
    console.log('isadmin', isAdmin);



    return (
        <div>
            {!isAdmin ? <Header /> : <AdminHeader />}
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