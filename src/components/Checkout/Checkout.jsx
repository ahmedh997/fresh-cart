import React, { useContext, useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';



export default function Checkout() {

    
const [loading, setloading] = useState(false);

    let {checkOut, cartId}  =  useContext(CartContext)


    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },

        onSubmit: ()=>
            handleCheckout(cartId, `https://fresh-cart-mu-pearl.vercel.app`)
    });

    async function handleCheckout(cartId, url) {
        setloading(true)
        
     let {data} = await checkOut(cartId, url, formik.values)
        setloading(false)
        console.log(data?.session?.url);
        window.location.href = data?.session?.url

    }


    return <>
        <div className='py-6 max-w-lg mx-auto w-[90%]'>

            

            <div className="text my-4">
                <h1 className='mb-4'>Checkout</h1>
            </div>


            <form className="max-w-lg mx-auto text-left" onSubmit={formik.handleSubmit}>



                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="floating_details" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="floating_details" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Details</label>
                </div>


                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 :text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
                </div>

                
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                    <label htmlFor="city" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 :text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
                </div>




                <div className='flex items-center'>
                    <button type="submit" className="text-white w-full bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">

                        {loading? <i className='fas fa-spin fa-spinner'></i> :'Checkout'}
                        
                    </button>
                </div>


            </form>

        </div>
    </>;
}