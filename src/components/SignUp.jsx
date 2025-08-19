import React from 'react'

const SignUp = () => {
    return (
        <div className='w-full h-full flex items-center justify-center '>

            <div className='w-full p-6 max-w-md rounded-2xl shadow-lg  bg-blue-200 ' >

                <h1 className="text-2xl font-semibold text-gray-800 text-center">Registration</h1>
                <form action="" className="mt-6 grid gap-4">

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                        <input type="text" id="name" required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password <span className="text-red-500">*</span></label>
                        <input type="text" id="password" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="usertype" className='text-sm font-medium text-gray-700'>User Type <span className="text-red-500">*</span></label>
                        <select name="usertype" id="usertype" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-Select Value-</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-400 py-2 text-white font-medium hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>


        </div>
    )
}

export default SignUp