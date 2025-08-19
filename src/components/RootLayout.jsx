import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        
        <header>
            <h1 className='bg-yellow-200  text-3xl text-center'>hy from root layout :)</h1>

            <nav className='flex  gap-4 bg-violet-200 justify-center p-5'>
                <NavLink to="/">Products</NavLink>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>                
            </nav>
        </header>

        <main className='p-4 w-[100%] h-[80vh] bg-slate-400'>
                <Outlet/>
        </main>
        <footer className='flex justify-center p-5'>
            <p> footer section </p>
        </footer>
    </div>
  )
}

export default RootLayout