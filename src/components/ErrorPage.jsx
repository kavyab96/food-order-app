import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate =useNavigate()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

  const handleBack =()=>{
      if(isLoggedIn){
        navigate('/home')
      }else{
        navigate("/")
      }
  }

  return (
    <div className='w-[100%] h-screen flex items-center justify-center'>

      <div className="w-full flex flex-col items-center justify-center relative">
        
        <img src="/images/pnf-2.png" alt="page not found image" width="18%"  />      
        <button  
        onClick={handleBack}
          className="
          px-[40px] py-3
           bg-gradient-to-r from-orange-400 to-pink-500 
          text-white rounded-lg
           hover:bg-blue-600 
            hover:from-blue-500 hover:to-blue-400 
           transition duration-300 absolute bottom-[5px]">
            Go Back
        </button>

      </div>

    </div>
  )
}

export default ErrorPage