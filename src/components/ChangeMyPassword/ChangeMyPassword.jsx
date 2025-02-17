import React, { useContext, useEffect, useState } from 'react';
import Style from './ChangeMyPassword.module.css';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';



export default function ChangeMyPassword() {

    let { userLogin, setUserLogin } = useContext(UserContext);

    let navigate = useNavigate();

    let validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is invalid").required('Email is required'),
        newPassword: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password format is not correct!").required('Password is required'),
    });

    const [apiError, setapiError] = useState('');
    const [isLoading, setisLoading] = useState(false);

    function handleChangePass(formValues) {
        setisLoading(true);
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValues)
            .then((x) => {
                
                
                setisLoading(false);
                toast.success('Password Changed Successfully');
                localStorage.setItem('userToken', x.data.token);
                setUserLogin(x.data.token);
                navigate('/');
                


            })
            .catch((apiResponse) => {
                
                
                setisLoading(false);
                setapiError(apiResponse?.response?.data?.message);
            });
    }

    let formik = useFormik({
        initialValues: {

            email: '',
            newPassword: '',

        },
        validationSchema,
        onSubmit: handleChangePass
    });

    return <>
        <div className='py-6 max-w-lg mx-auto w-[90%]'>

            {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                {apiError}
            </div> : null}

            <h2 className='py-3 text-center font-bold text-3xl text-emerald-600 uppercase'>Change Your Password</h2>


            <form className="max-w-lg mx-auto text-left" onSubmit={formik.handleSubmit}>



                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="floating_email" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address</label>
                </div>

                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.email}
                </div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="newPassword" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 :text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password</label>
                </div>

                {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.newPassword}
                </div> : null}


                <div className='flex flex-col items-center mb-3'>
                    <button type="submit" className="w-full text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">

                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Confirm"}
                    </button>
                   
                </div>

                

            </form>

        </div>
    </>;
}