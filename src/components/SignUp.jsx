import React, { useState } from 'react'


const SignUp = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        usertype: "",
        phone:""
    })


    const [errors, setErrors] = useState({});
    const validate = () => {
        let newErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const addressRegex = /^[A-Za-z\s,]+$/;
        const phoneRegex = /^[0-9]{8,13}$/;
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = "Name should contain only letters and spaces."
        }


        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        } else if (!addressRegex.test(formData.address)) {
            newErrors.address = "Address can contain only letters, spaces, and commas.";
        } else if (formData.address.length > 100) {
            newErrors.address = "Address should not exceed 100 characters.";
        }

        // Phone number validation
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number must be 8 to 13 digits with no spaces or special characters.";
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
            handleResetForm();
            // reseting formData 
        }


    }

    function  handleResetForm (){
        setFormData({ name: "", password: "", email: "", usertype: "", address: "",phone:"" })
    }

    return (
        <div className='w-full h-[100vh] flex items-center justify-center '>

            <div className='w-full p-6 max-w-md rounded-2xl shadow-lg  bg-blue-200 ' >

                <h1 className="text-2xl font-semibold text-gray-800 text-center">Registration</h1>
                <form action="" className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-3'>


                        {/* <h1> {JSON.stringify(formData)}</h1> */}

                        {/* name  */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                            <input type="text" id="name" required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                maxLength="20"
                                minLength="8"
                                title="Password must be between 8 and 20 characters."
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className='block text-sm font-medium text-gray-700'>Phone <span className="text-red-500">*</span></label>
                            <input type="tel" id="phone" required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>


                        <div>
                            <label htmlFor="address" className='block text-sm font-medium text-gray-700'>Address <span className="text-red-500">*</span></label>
                            <textarea type="address" id="address" required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                maxLength="100"
                                title="Address should not exceed 100 characters."
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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


                        <button type='reset' className='w-full rounded-lg bg-red-400 py-2 text-white font-medium hover:bg-red-600 transition'
                            onClick={handleResetForm}>Clear</button>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-400 py-2 text-white font-medium hover:bg-blue-600 transition"
                        >
                            {/* onClick={handleSubmit} */}
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default SignUp 