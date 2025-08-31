import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom";
import { persistor } from '../store/store';
import { LuPhone, LuMail ,LuFolderPen} from "react-icons/lu";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // get auth state
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

   
    if (!isLoggedIn) {
        return <p className="text-center mt-6">You are not logged in.</p>;
    }

    return (
        <div className="w-[100%] h-[100vh] p-6 bg-[#1c93a8]">

            <div className='w-[100%] py-10 px-5 flex flex-col'>
                <div className='w-[100%]  flex justify-between'>

                    <div className="space-y-2 mb-6 w-[35%] p-2 ">
                        <h1 className="text-4xl font-bold mb-4 text-white">{user.name}</h1>
                        <p className=' text-white text-[1.1rem] font-semibold  flex justify-start items-center'>
                            <LuPhone size={18} className='me-2 shrink-0 ' /> {user?.phone}
                            <span className='ms-3 me-3'>|</span>
                            <LuMail size={18} className='me-2 shrink-0' />{user?.email}
                        </p>
                    </div>

                    {/* <button><LuFolderPen size={20}/></button> */}
                </div>



              
            </div>
        </div>
    )
}

export default Profile