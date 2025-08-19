import React from 'react'

const Login = () => {
  return (
    <div className='my-[100px] mx-auto bg-blue-200 h-auto w-[40%] p-5 rounded-[10px] shadow-2xl'>
        <h1 className='text-2xl font-bold text-center p-[10px]'>Login</h1>
        <form action="" className=' w-[60%] my-3 mx-auto flex flex-col gap-3'>

            <div className='flex flex-col'>
                <label htmlFor="email">Email <span>*</span></label>
                <input type="email" id='email'  className='rounded p-[5px]'required/>
            </div>

             <div  className='flex flex-col'>
                <label htmlFor="password">Password <span>*</span></label>
                <input type="password" id='password' className='rounded p-[5px]' required/>
            </div>

            <button type="submit" className='p-[5px] border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] hover:bg-blue-600'>Login</button>
        </form>
    </div>
  )
}

export default Login