import React, { useContext, useEffect, useState } from 'react';
import Style from './RecentProudcts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';






export default function RecentProudcts() {

    let {addToWishlist, numberOfItems, setnumberOfItems} = useContext(WishlistContext)
    let { addToCart, setnumberItems, numberItems } = useContext(CartContext);
    let { data, isLoading, isError, error } = useProducts();
    const [loading, setloading] = useState(false);
    const [selectedProduct, setselectedProduct] = useState(0);

    async function addProductToCart(productId) {
        setselectedProduct(productId);
        setloading(true);
        setnumberItems(numberItems + 1)
        let res = await addToCart(productId);
        if (res.data.status === 'success') {
            toast.success(res.data.message);
            setloading(false);
        }
        else {
            toast.error('Something Went Wrong');
            setloading(false);
        }
        console.log(res);

    }
    async function addProductToWishlist(productId) {

        setnumberOfItems(numberOfItems + 1)

        let res = await addToWishlist(productId);
        if (res.data.status === 'success') {
            toast.success('Product Added Successfully To Your Wishlist');
            setloading(false);
        }
        else {
            toast.error('Something Went Wrong');
            setloading(false);
        }
        console.log(res);

    }



    if (isLoading) {
        return <>
            <div className='flex justify-center items-center w-full'>
                <ClimbingBoxLoader color='#059669' />
            </div>

        </>;
    }
    if (isError) {
        return <>
            <div className='flex justify-center items-center w-full'>
                <h3>{error}</h3>
            </div>

        </>;
    }





    return (

        <>

            <div className="row">
                {data.map((product) => (
                    <div key={product.id} className='w-1/6 mt-5 shadow-lg mx-5 border-2 bg-white rounded-lg hover:border-2 hover:shadow-lg hover:transition-all hover:duration-300 hover:delay-100 ease-in-out hover:scale-105'>
                        <div className="product p-5 group overflow-hidden">
                            <i onClick={()=> addProductToWishlist(product.id)} className='cursor-pointer fas fa-heart text-emerald-600 text-lg opacity-0 translate-x-20 group-hover:opacity-100 group-hover:translate-x-[85px] transition-all '></i>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                <img className='w-[200px] h-[200px] object-cover' src={product.imageCover} alt="Product image" />
                                <h3 className='text-emerald-500 mt-2'>{product.category.name}</h3>
                                <h3 className='text-black mb-3 font-semibold'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                <hr />
                                <div className='text-black price-rating flex justify-between p-3'>
                                    <span>{product.price}EGP</span>
                                    <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
                                </div>
                            </Link>
                            <button onClick={() => addProductToCart(product.id)} className='btn bg-emerald-600 text-white rounded-xl px-5 py-2 w-full'>
                                {loading && selectedProduct == product.id ? <i className='fas fa-spinner fa-spin'></i> : <span><i className='fas fa-shopping-cart'></i> Add to Cart</span>}
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </>

    );
}
