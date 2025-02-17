import React, { useContext, useEffect, useState } from 'react';
import Style from './VerifyCode.module.css';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function VerifyCode() {



    let navigate = useNavigate();

    let validationSchema = Yup.object().shape({
        resetCode: Yup.string().matches(/^[0-9]{5,6}$/, "Code format is not correct!").required('Verify Code Is Required'),
    });

    const [apiError, setapiError] = useState('');
    const [isLoading, setisLoading] = useState(false);


   
    

    function handleVerifyCode(value) {
        setisLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value)
            .then((x) => {
                console.log(x);

                setisLoading(false);
                if (x.data.status == 'Success') {


                    toast.success(x.data.status);

                    
                    navigate('/changemypassword');
                }
                else {
                    toast.error('Something Went Wrong');
                }


            })
            .catch((apiResponse) => {
                setisLoading(false);
                console.log(apiResponse);
                
                setapiError(apiResponse?.message);
            });
    }



    let formik = useFormik({
        initialValues: {

            resetCode:  "",

        },
        validationSchema,
        onSubmit: handleVerifyCode
    });


    return <>
        <div className='py-6 max-w-lg mx-auto w-[90%]'>

            {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                {apiError}
            </div> : null}

            <h2 className='py-3 text-center font-bold text-3xl text-emerald-600 uppercase'>Enter Your verification Code</h2>


            <form className="max-w-lg mx-auto text-left" onSubmit={formik.handleSubmit}>



                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="password" name="resetCode" id="floating_code" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="floating_code" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the code sent to your Email</label>
                </div>

                {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full" role="alert">
                    {formik.errors.resetCode}
                </div> : null}



                <div className='flex items-center'>
                    <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Verify Code"}
                    </button>
                </div>


            </form>

        </div>
    </>;
}
