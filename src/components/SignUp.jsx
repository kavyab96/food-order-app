import React, { useState } from 'react'


const SignUp = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        usertype: ""
    })

   
 const [errors, setErrors] = useState({});
   const validate = () => {
        let newErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }else if (!nameRegex.test(formData.name)) {
              newErrors.name = "Name should contain only letters and spaces."
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
         return newErrors;
   }
    function handleSubmit(e) {
        e.preventDefault();
         const validationErrors = validate();
          setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            const users = JSON.parse(localStorage.getItem("users")) || [];
         
            //email checking//
            const emailExists = users.find((u) => u.email === formData.email);
            if (emailExists) {
                setErrors({ email: "Email already registered" });
                return
            }
            // email checking 

            users.push(formData);
            localStorage.setItem("users", JSON.stringify(users));
            alert(`${formData.usertype} Registered Successfully`, formData);
            // reseting formData 
                setFormData({name: "",password: "",email: "",usertype: ""})
            // reseting formData 
        }

          
    }

    const handleResetForm =()=>{
          setFormData({name: "",password: "",email: "",usertype: ""})
    }

    return (
        <div className='w-full h-full flex items-center justify-center '>

            <div className='w-full p-6 max-w-md rounded-2xl shadow-lg  bg-blue-200 ' >

                <h1 className="text-2xl font-semibold text-gray-800 text-center">Registration</h1>
                <form action="" className="mt-6 grid gap-4" onSubmit={handleSubmit}>

                    {/* <h1> {JSON.stringify(formData)}</h1> */}

                    {/* name  */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                        <input type="text" id="name" required
                            value={formData.name}
                            onChange={(e) =>setFormData({ ...formData, name: e.target.value })} 
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                         {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* email  */}
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                         {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password <span className="text-red-500">*</span></label>
                        <input type="password" id="password" required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            maxlength="20"
                             minlength="8"
                              title="Password must be between 8 and 20 characters."
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="usertype" className='text-sm font-medium text-gray-700'>User Type <span className="text-red-500">*</span></label>
                        <select name="usertype" id="usertype" required
                            value={formData.usertype}
                            onChange={(e) => setFormData({ ...formData, usertype: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-Select Value-</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>


                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-400 py-2 text-white font-medium hover:bg-blue-600 transition"
                    >
                        {/* onClick={handleSubmit} */}
                        Sign Up
                    </button>
                    <button type='reset' className='w-full rounded-lg bg-red-400 py-2 text-white font-medium hover:bg-red-600 transition' 
                    onClick={handleResetForm}>Clear</button>
                </form>
            </div>


        </div>
    )
}

export default SignUp 