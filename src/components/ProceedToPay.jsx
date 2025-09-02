import { useSelector } from 'react-redux'
import { LuSquareUserRound, LuCircleCheck } from "react-icons/lu";
import React, { useState } from "react";
import EditAddressModal from './EditAddressModal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginDrawer from './LoginDrawer';
import SignupDrawer from './SignupDrawer';

const ProceedToPay = () => {

    const [showLoginDrawer, setShowLoginDrawer] = useState(false)
    const [signupDrawer, setSignupDrawer] = useState(false)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const [showUpdateModal, setshowUpdateModal] = useState(false);

    function handleSaveAddress(e, add) {
        e.preventDefault();

        if (!newAddress.trim()) return;
        const address = add.trim()
        // const updatedUser = { ...user, address: newAddress };

        const storeUsers = JSON.parse(localStorage.getItem("users"))
        const matchUser = storeUsers.find(u => u.email === user.email && u.password === user.password)
        if (matchUser) {
            matchUser.address = address
        }
        // Save updated list
        localStorage.setItem("users", JSON.stringify(matchUser));

        // updating state         
        dispatch(updateAddress(address))

    }

    return (
        <div className='w-[100%] p-3'>

            {/* <h1 className='text-white mb-3'>ProceedToPay</h1> */}
            {
                isLoggedIn ?
                    (
                        <div className='w-[100%] h-[100%] flex flex-col gap-5 py-5 px-2 '>

                            <div className="flex flex-col  gap-y-2 items-start justify-between  border rounded-lg p-4 bg-white shadow-sm dark:bg-gray-800">

                                < div className='grid grid-cols-2 text-[1.1rem] font-bold items-center '>
                                    <p className=''>Logged In</p>
                                    <div className="justify-self-center  ">
                                        <LuCircleCheck className='bg-green-500 text-white rounded-full  ' size={20} />
                                    </div>
                                </div>

                                <div className="flex items-center  gap-3 text-gray-600 dark:text-white">

                                    <p className="text-sm ">{user.name}</p> |
                                    <p className="text-sm ">{user.email}</p>

                                </div>
                            </div>

                            {/* address  */}
                            <div className="flex flex-col  gap-y-2 items-start justify-between  border rounded-lg p-4 bg-white shadow-sm dark:bg-gray-800">

                                {
                                    user?.address && user.address.trim() != ""
                                        ? (
                                            <div className='flex flex-col gap-3 justify-start items-start'>

                                                <p className='text-[1.1rem] font-semibold'>Delivery address</p>
                                                <p className='text-sm text-gray-600 dark:text-white'>{user.address}</p>
                                                {/* <button
                                                    onClick={() => setshowUpdateModal(true)}
                                                    className=' bg-slate-400 text-stone-50 p-2 rounded-lg'>Change Address
                                                </button> */}

                                                {/* modal */}
                                                <EditAddressModal
                                                    show={showUpdateModal}
                                                    onClose={() => setshowUpdateModal(false)}
                                                    user={user}
                                                    onSave={(e) => handleSaveAddress(e, add)}
                                                />
                                                {/* modal */}



                                            </div>
                                        )
                                        : (
                                            <div className='flex flex-col gap-3 justify-start items-start'>
                                                <p className='text-[1.1rem] font-semibold'>Add a delivery address</p>

                                                <button className=' bg-slate-400 text-stone-50 p-2 rounded-lg'>Add Address</button>
                                            </div>
                                        )
                                }
                            </div>

                            <div className="flex flex-col  gap-y-2 items-center justify-center  border rounded-lg p-4 bg-white shadow-sm dark:bg-gray-800">

                                <Link rel="stylesheet" to="/checkout" className='bg-green-400 px-9 py-2 rounded-xl text-white font-bold text-[1.1rem]'>
                                    Ckeck out

                                </Link>
                            </div>






                        </div>

                    ) :
                    (
                        <div className='w-[100%] h-[100%]  px-10 py-5'>
                            <div className='w[100%] my-2 mx-auto text-center sm:text-start flex flex-col gap-2'>
                                <h2 className='font-bold text-[1.3rem] text-white-300'>
                                    Account
                                </h2>
                                <p className='text-.9rem text-white-300' >
                                    To place your order now, log in to your existing account or sign up.

                                </p>
                            </div>

                            <div className=' grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 justify-items-center'>
                                <button className='p-2 w-[80%] font-semibold text-[0.7rem] md:text-[0.9rem] bg-white  text-[#09ac63]  border border-white
                                 hover:shadow-lg  hover:scale-[1.02] transition-all duration-300 ease-in-out'
                                    onClick={() => setShowLoginDrawer(true)}>Have an account ?
                                    <p className='text-[0.8rem] md:text-[1rem] font-bold'>LOGIN</p>
                                </button>

                                <button
                                    onClick={() => setSignupDrawer(true)}
                                    className='p-2 w-[80%] font-semibold text-[0.7rem] md:text-[0.9rem]  hover:scale-[1.02] bg-[#09ac63] text-white border border-[#09ac63] hover:shadow-lg'>
                                        New to Cusino ? <p className='text-[0.8rem] md:text-[1rem] font-bold'>SIGN UP</p></button>
                            </div>
                        </div>
                    )
            }

            {/* LoginDrawer component  */}
            <LoginDrawer showLoginDrawer={showLoginDrawer} setShowLoginDrawer={setShowLoginDrawer} />
            {/* LoginDrawer component  */}

            {/* signupDrawer component  */}
            <SignupDrawer signupDrawer={signupDrawer} setSignupDrawer={setSignupDrawer} />
            {/* signupDrawer component  */}
        </div>
    )
}

export default ProceedToPay