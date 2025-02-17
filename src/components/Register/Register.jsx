
import React, { useContext, useEffect, useState } from 'react';
import Style from './Register.module.css';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';




export default function Register() {

    let { userLogin, setUserLogin } = useContext(UserContext);

    let navigate = useNavigate();

    let validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'name min length is 3 chars').max(20, 'name max length is 20 chars').required('Name is required'),
        email: Yup.string().email("Email is invalid").required('Email is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Phone must be valid Egyptian number").required('Phone is required'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Your password must include at least one lowercase letter (a-z), one uppercase letter (A-Z), one number (0-9), and be at least 8 characters long.").required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], "password and rePassword does not match").required('Re-password is required'),
    });

    const [apiError, setapiError] = useState('');
    const [isLoading, setisLoading] = useState(false);

    function handleRegister(formValues) {
        setisLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
            .then((x) => {
                setisLoading(false);
                if (x.data.message == "success") {
                    
                    navigate('/login');
                }


            })
            .catch((apiResponse) => {
                setisLoading(false);
                setapiError(apiResponse?.response?.data?.message);
                console.log(apiResponse?.response?.data?.message);
            });


    }

    let formik = useFormik({
        initialValues: {
            name: "",
            phone: '',
            email: '',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: handleRegister
    });

    return <>
        <div className='py-6 max-w-lg mx-auto w-[90%]'>

            {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                {apiError}
            </div> : null}

            <h2 className='py-3 text-center font-bold text-3xl text-emerald-600 uppercase'>Register</h2>


            <form className="max-w-lg mx-auto text-left " onSubmit={formik.handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="floating_name" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="floating_name" className=" px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
                </div>

                {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.name}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="floating_phone" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="floating_phone" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Phone Number</label>
                </div>

                {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.phone}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="floating_email" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address</label>
                </div>

                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.email}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.password}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="repeat_password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="repeat_password" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>

                {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.rePassword}
                </div> : null}


                <div className='flex items-center'>
                    <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">

                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Submit"}
                    </button>
                    <p className='text-sm mt-4 text-black'>Already have account? <span className='font-bold'><Link className='underline' to={'/login'}>Login</Link></span></p>
                </div>
            </form>

        </div>
    </>;
}