import React, { useContext, useEffect, useState } from 'react';
import Style from './Login.module.css';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';



export default function Login() {

    let {userLogin, setUserLogin} = useContext(UserContext)

    let navigate = useNavigate();

    let validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is invalid").required('Email is required'),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password format is not correct!").required('Password is required'),
    });

    const [apiError, setapiError] = useState('');
    const [isLoading, setisLoading] = useState(false);

    function handleSignIn(formValues) {
        setisLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
            .then((x) => {
                setisLoading(false);
                if(x.data.message == 'success'){
                    localStorage.setItem('userToken', x.data.token)
                    setUserLogin(x.data.token)
                    toast.success('Login Successful')
                    navigate('/');
                }
                

            })
            .catch((apiResponse) => {
                setisLoading(false);
                setapiError(apiResponse?.response?.data?.message);
            });
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: handleSignIn
    });

    return <>
        <div className='py-6 max-w-lg mx-auto w-[90%]'>

            {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                {apiError}
            </div> : null}

            <h2 className='py-3 text-center font-bold text-3xl text-emerald-600 uppercase'>Login</h2>


            <form className="max-w-lg mx-auto text-left" onSubmit={formik.handleSubmit}>



                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="floating_email" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address</label>
                </div>

                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.email}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 :text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.password}
                </div> : null}


                <div className='flex items-center'>
                    <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-40 px-5 py-2.5 text-center">

                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
                    </button>
                    <p className='text-sm pl-4 text-black'>Don't have account? <span className='font-bold'><Link className='underline' to={'/register'}>Register</Link></span></p>
                </div>


            </form>

        </div>
    </>;
}