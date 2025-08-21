import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {login} from '../features/auth/authSlice'

const Login = () => {

  const [user, setUser] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({ email: "", password: "" });
  
  const authUser = useSelector((state)=>state.auth)
  console.log('auth',authUser);
  const dispatch =useDispatch();
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;
    let tempErrors = { email: "", password: "" }

    if (!user.email.trim()) {
      tempErrors.email = "Email is required"
      valid = false
    }
    if (!user.password.trim()) {
      tempErrors.password = "Password is required"
      valid = false
    } else if (user.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
      valid = false;
    } else if (user.password.length > 20) {
      tempErrors.password = "Password cannot exceed 20 characters";
      valid = false;
    }

    setErrors(tempErrors)
    if (valid) {
      const storeUsers = JSON.parse(localStorage.getItem("users")) || [] 
      const matchUser = storeUsers.find(u=>u.email===user.email &&  u.password===user.password)
      if(matchUser){
        // Update Redux authentication state:
        dispatch(login(matchUser));
        navigate("/home")
        alert('login success')
       
      }else{
        alert("Invalid email or password");
      }

    }

  }



  return (
    <div className='my-[100px] mx-auto bg-blue-200 h-auto w-[40%] p-5 rounded-[10px] shadow-2xl'>
      <h1 className='text-2xl font-bold text-center p-[10px]'>Login</h1>
      <form action="" className=' w-[60%] my-3 mx-auto flex flex-col gap-3' onSubmit={handleSubmit}>

        <div className='flex flex-col'>
          <label htmlFor="email">Email <span>*</span></label>
          <input type="email" id='email' name="email" className='rounded p-[5px]'
            required
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-600 text-[14px]">{errors.email}</p>}

        </div>

        <div className='flex flex-col'>
          <label htmlFor="password">Password <span>*</span></label>
          <input type="password" id='password' className='rounded p-[5px]' name='password'
            maxlength="20"
            minlength="8"
            required
            value={user.password}
            onChange={handleChange} />
        </div>
        {errors.password && <p className="text-red-600 text-[14px]">{errors.password}</p>}


        <button type="submit" className='p-[5px] border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] hover:bg-blue-600'>Login</button>
      </form>
    </div>
  )
}

export default Login