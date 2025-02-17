import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';



export default function Cart() {

    let { getCartItems, updateCartItems, deleteCartItems, setnumberItems, numberItems } = useContext(CartContext);

    const [cartDetails, setcartDetails] = useState(null);

    const [loading, setloading] = useState(false);

    const [selectedProduct, setselectedProduct] = useState(0);





    async function updateCart(id, count) {
        setloading(true);
        setselectedProduct(id);
        let update = await updateCartItems(id, count);
        console.log(update);

        if (update.data.status == 'success') {
            setcartDetails(update.data.data);
            toast.success('Product Updated Successfully');
            setloading(false);
        }
        else {
            toast.error('Something Went Wrong');
            setloading(false);
        }
    }

    async function deleteCart(id) {
        let remove = await deleteCartItems(id);

        if (remove.data.status == 'success') {
            setcartDetails(remove.data.data);
            setnumberItems(numberItems - 1)
            toast.success('Product removed Successfully');
        }
        else {
            toast.error('Something Went Wrong');
        }
    }

    async function getCart() {
        let cart = await getCartItems();
        console.log(cart);
        setcartDetails(cart.data.data);
    }

    useEffect(
        () => {
            getCart();
        }, []);
    return <>
        {cartDetails?.products.length > 0 ? <>
            <div className="flex gap-10 w-[90%] m-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartDetails?.products.map((product) => <tr key={product.product.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                                <td className="p-4">
                                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product.product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => updateCart(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            {loading && selectedProduct == product.product.id ? <i className='fas fa-spinner fa-spin'></i> : <span>{product.count}</span>}
                                        </div>
                                        <button onClick={() => updateCart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product.price * product.count} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <a onClick={() => deleteCart(product.product.id)} href="#" className="flex gap-1 justify-center items-center font-medium text-red-600"><i class="fa-solid fa-trash-can"></i> Remove</a>
                                </td>
                            </tr>

                            )}
                        </tbody>
                    </table>
                </div>
                <div className="cart-details text-black shadow-md sm:rounded-lg w-96 h-fit">
                    <div className='text-xs text-gray-700 uppercase bg-gray-50 py-3'>
                        <span className='px-16 py-3 font-bold'>Order Summary</span>
                    </div>
                    <div className='flex justify-between items-center text-left'>
                        <div className='px-6 py-4 font-semibold text-gray-600'>
                            <span>
                                Subtotal ({cartDetails?.products.length} items)
                            </span>
                        </div>
                        <div className='px-6 py-4 font-semibold text-gray-600'>
                            <span>
                                {cartDetails?.totalCartPrice} EGP
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center text-left'>
                        <div className='px-6 py-4 font-semibold text-gray-600'>
                            <span>
                                Shipping
                            </span>
                        </div>
                        <div className='px-6 py-4 font-semibold text-emerald-500'>
                            <span>
                                Free
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center text-lg'>
                        <div className='px-6 py-4 font-semibold text-gray-900'>
                            <span>
                                Total
                            </span>
                        </div>
                        <div className='px-6 py-4 font-semibold text-gray-900'>
                            <span>
                                {cartDetails?.totalCartPrice} EGP
                            </span>
                        </div>
                    </div>

                    <Link to={`/checkout`}>

                        <div className='flex justify-center items-center text-center'>
                            <button className='btn bg-emerald-600 text-white rounded-xl px-5 py-2 w-full m-5'>Checkout</button>
                        </div>
                    </Link>

                </div>

            </div>

        </> : <h2 className='text-gray-700 font-bold text-3xl p-44'>Your Cart Is Empty</h2>}


    </>;
}
