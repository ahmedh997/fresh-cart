import React, { useContext, useEffect, useState } from 'react';
import Style from './RecentProudcts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';






export default function RecentProudcts() {

    let { addToWishlist, deleteWishlist, numberOfItems, setnumberOfItems } = useContext(WishlistContext);
    let { addToCart, setnumberItems, numberItems } = useContext(CartContext);
    let { data, isLoading, isError, error } = useProducts();
    console.log(data);

    const [loading, setloading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [loadingWishlist, setLoadingWishlist] = useState(false);
    const [selectedWishlistProduct, setSelectedWishlistProduct] = useState(0);


    const [addedToFav, setAddedToFav] = useState(false);

    async function addProductToCart(productId) {
        setSelectedProduct(productId);
        setloading(true);
        setnumberItems(numberItems + 1);
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
    async function removeProductFromWishlist(productId) {
        setAddedToFav(false);
        setSelectedWishlistProduct(productId);
        setnumberOfItems(numberOfItems - 1);
        setLoadingWishlist(true);
        let res = await deleteWishlist(productId);
        if (res?.data?.status === 'success') {
            toast.success('Product Removed Successfully To Your Wishlist');
            setLoadingWishlist(false);
        }
        else {
            toast.error('Something Went Wrong');
            setLoadingWishlist(false);
        }
        console.log(res);

    }
    async function addProductToWishlist(productId) {
        setAddedToFav(true);
        setSelectedWishlistProduct(productId);
        setnumberOfItems(numberOfItems + 1);
        setLoadingWishlist(true);
        let res = await addToWishlist(productId);
        if (res.data.status === 'success') {
            toast.success('Product Added Successfully To Your Wishlist');
            setLoadingWishlist(false);
        }
        else {
            toast.error('Something Went Wrong');
            setLoadingWishlist(false);
        }
        console.log(res);

    }



    if (isLoading) {
        return <>
            <div className='flex justify-center items-center w-full mt-24'>
                <ClipLoader size={60} color='#059669' />
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


    const StarRating = ({ rating }) => {
        const filledStars = Math.floor(rating);
        return (
            <h6>
                {Array.from({ length: 5 }, (_, i) => (
                    <i
                        key={i}
                        className={`fas fa-star ${i < filledStars ? 'text-yellow-400' : 'text-gray-300'}`}
                    ></i>
                ))}
                {rating}
            </h6>
        );
    };


    return (

        <>

            <div className="row gap-4 items-center justify-center">
                {data?.map((product) => (
                    <div key={product?.id} className='w-full mx-10 md:mx-0 md:w-1/3 lg:w-1/4 xl:w-1/5 shadow-lg md:gap-0 border-2 md:border-0 md:shadow-none bg-white rounded-lg'>
                        <div className="product group overflow-hidden border border-1 hover:border-emerald-600 rounded-lg shadow-md  transition-all relative">
                            <button onClick={() => addProductToWishlist(product?.id)} className='opacity-0 bg-slate-50 shadow-md flex justify-center items-center group-hover:opacity-100 btn bg-light text-red-700 rounded-full z-40 size-10 top-4 right-4 absolute'>
                                {loadingWishlist && selectedWishlistProduct == product?.id ? <i className='fas fa-spinner fa-spin'></i> : <span><i className='far fa-heart'></i></span>}
                            </button>
                            <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                                <div className='overflow-hidden'><img className='size-full md:h-72 object-cover mb-2 md:w-80 m-auto group-hover:scale-105' src={product?.imageCover} alt="Product image" /></div>

                                <div className="content px-4 py-2 text-left bg-slate-50 border-t-2">

                                    <h6 className='text-black font-light my-1 text-sm'>{product?.brand?.name}</h6>

                                    <h2 className='text-black font-bold text-md'>{product?.title?.split(' ').slice(0, 3).join(' ')}</h2>

                                    <h6 className='text-green-600 mt-2 text-lg'>{product?.price} EGP</h6>
                                    <div className='text-black price-rating'>
                                        <StarRating rating={product?.ratingsAverage || 0} />
                                        <h6 className='text-xs'>{product?.ratingsQuantity} Reviews</h6>
                                    </div>
                                </div>
                            </Link>

                            <div className="link-cart p-2 bg-slate-50">

                                <button disabled={loading} onClick={() => addProductToCart(product?.id)} className='btn w-full bg-green-500 hover:bg-green-600 text-white rounded-xl px-5'>
                                    {loading && selectedProduct == product?.id ? <i className='fas fa-spinner fa-spin'></i> : <span> Add to Cart</span>}
                                </button>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </>

    );
}
