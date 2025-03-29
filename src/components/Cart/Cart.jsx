import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import emptyCart from '../../assets/images/empty cart.png';



export default function Cart() {

    let { getCartItems, updateCartItems, deleteCartItems, setnumberItems, numberItems } = useContext(CartContext);

    const [cartDetails, setcartDetails] = useState(null);

    const [loading, setloading] = useState(true);

    const [loadingDelete, setLoadingDelete] = useState(false);

    const [selectedProduct, setselectedProduct] = useState(0);

    const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(0);





    async function updateCart(id, count) {
        setloading(true);
        setselectedProduct(id);
        let update = await updateCartItems(id, count);
        console.log(update);

        if (update.data.status == 'success') {
            setcartDetails(update?.data?.data);
            toast.success('Product Updated Successfully');
            setloading(false);
        }
        else {
            toast.error('Something Went Wrong');
            setloading(false);
        }
    }

    async function deleteCart(id) {

        setLoadingDelete(true);
        setSelectedDeleteProduct(id);

        let remove = await deleteCartItems(id);

        if (remove?.data?.status == 'success') {
            setLoadingDelete(false);
            setcartDetails(remove?.data?.data);
            setnumberItems(numberItems - 1);
            toast.success('Product removed Successfully');
        }
        else {
            setLoadingDelete(false);
            toast.error('Something Went Wrong');
        }
    }

    async function getCart() {
        let cart = await getCartItems();
        console.log(cart);
        setcartDetails(cart?.data?.data);
        setloading(false);
    }

    useEffect(
        () => {
            getCart();
        }, []);



    return <>
        <div className="text my-4">
            <h1 className='mb-4'>Your Cart Items</h1>
        </div>
        {cartDetails?.products.length > 0 ? <>
            <div className="flex flex-col lg:flex-row w-9/10 gap-5 m-auto mt-9">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full flex flex-wrap">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className=" py-3">
                                    Product
                                </th>
                                <th scope="col" className=" py-3">
                                    Quantity
                                </th>
                                <th scope="col" className=" py-3">
                                    Price
                                </th>
                                <th scope="col" className=" py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartDetails?.products?.map((product) => <tr key={product?.product?.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 text-center">
                                <td className="p-4">
                                    <img src={product?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product?.product?.title} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product?.product?.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <button onClick={() => updateCart(product?.product?.id, product?.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            {loading && selectedProduct == product?.product?.id ? <i className='fas fa-spinner fa-spin'></i> : <span>{product?.count}</span>}
                                        </div>
                                        <button onClick={() => updateCart(product?.product?.id, product?.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product?.price * product?.count} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <a onClick={() => deleteCart(product?.product?.id)} role='button' className="flex gap-1 justify-center items-center font-medium text-red-600">{loadingDelete && selectedDeleteProduct == product?.product?.id ? <i className='fas fa-spin fa-spinner'></i> : <><i className="fa-solid fa-trash-can"></i><p>Remove</p></>}</a>
                                </td>
                            </tr>

                            )}
                        </tbody>
                    </table>
                </div>
                <div className="cart-details text-black shadow-md sm:rounded-lg w-[26rem] h-fit mx-auto">
                    <div className='text-xs text-gray-700 uppercase bg-gray-50 py-3'>
                        <span className='px-16 py-3 font-bold'>Order Summary</span>
                    </div>
                    <div className='flex justify-between items-center text-left'>
                        <div className='px-3 py-4 font-semibold text-gray-600'>
                            <span>
                                Subtotal <span className='text-xs'>({cartDetails?.products?.length} items)</span>
                            </span>
                        </div>
                        <div className='px-3 py-4 font-semibold text-gray-600'>
                            <span>
                                {cartDetails?.totalCartPrice} EGP
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center text-left'>
                        <div className='px-3 py-4 font-semibold text-gray-600'>
                            <span>
                                Taxes
                            </span>
                        </div>
                        <div className='px-3 py-4 font-semibold text-emerald-500'>
                            <span>
                                0
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center text-lg'>
                        <div className='px-3 py-4 font-semibold text-gray-900'>
                            <span>
                                Total
                            </span>
                        </div>
                        <div className='px-3 py-4 font-semibold text-gray-900'>
                            <span>
                                {cartDetails?.totalCartPrice} EGP
                            </span>
                        </div>
                    </div>

                    <Link to={`/checkout`}>
                        <div className='flex justify-center items-center text-center'>
                            <button className='btn bg-green-500 hover:bg-green-600 text-white rounded-xl px-5 py-2 w-full m-5'>Proceed To Checkout</button>
                        </div>
                    </Link>
                    <div className='mb-4'>or <Link to={`/products`} role='button' className='text-black underline hover:text-green-500'> continue Shopping <i className='fas fa-arrow-right'></i></Link> </div>

                </div>

            </div>

        </> : loading ? <div className='flex justify-center items-center w-full mt-32 p-16'>
            <ClipLoader size={60} color='#059669' />
        </div> : <>
            <div className="row flex-column items-center justify-center">

                <img width={300} src={emptyCart} alt="Empty cart" />
            </div>
            <h4>No items to show</h4>
        </>}


    </>;
}
