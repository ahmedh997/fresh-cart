import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import ClipLoader from 'react-spinners/ClipLoader';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';





export default function ProductDetails() {

    let { addToCart, setnumberItems, numberItems } = useContext(CartContext);

    let { addToWishlist, numberOfItems, setnumberOfItems } = useContext(WishlistContext);

    let { id, category } = useParams();

    const [product, setproduct] = useState(null);
    const [relatedProduct, setrelatedProduct] = useState([]);
    const [selectedProduct, setselectedProduct] = useState(0);
    const [selectedWishlist, setselectedWishlist] = useState(0);
    const [loading, setloading] = useState(false);
    const [loadingWishlist, setLoadingWishlist] = useState(false);


    async function addProductToCart(productId) {
        setselectedProduct(productId);
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

    async function addProductToWishlist(productId) {

        setnumberOfItems(numberOfItems + 1);
        setselectedWishlist(productId);
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



    var settings = {
        lazyLoad: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
    };

    function getProduct(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((res) => {
                console.log(res?.data?.data);
                setproduct(res?.data?.data);
                setselectedProduct(id);
            })
            .catch((res) => {
                console.log(res);

            });
    }

    function getAllProducts() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then((res) => {
                let related = res?.data?.data.filter((product) => product?.category?.name == category);
                setrelatedProduct(related);

            });
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

    useEffect(() => {
        getProduct(id);
        getAllProducts();
    }, [id, category]);

    return <>

        <div className="row items-center w-[90%] m-auto mb-10">
            <div className="w-full md:w-2/4 my-4">

                <Slider {...settings}>
                    {product?.images?.map((src) => <img src={src} className='h-96 object-contain p-3 rounded-lg' />)}
                </Slider>
            </div>

            <div className="md:w-2/4 m-auto md:m-0 md:text-left p-4 relative">
                <h5 className='text-black capitalize'>{product?.brand?.name}</h5>
                <h3 className='text-black font-bold text-3xl capitalize'>{product?.title}</h3>
                <h4 className='text-gray-600 my-4'><span className='text-black'>Description:</span> {product?.description}</h4>
                <h4 className='text-emerald-600 my-4'><span className='text-black'>Category:</span> {product?.category.name}</h4>
                <div className="price-rating flex justify-between py-3">
                    <span className='text-black'>{product?.price} EGP</span>
                    <StarRating rating={product?.ratingsAverage || 0} />
                </div>
                <div className="action-btns flex gap-5">
                    <button disabled={loading} onClick={() => addProductToCart(product?.id)} className='bg-green-500 hover:bg-green-600 text-white rounded-xl px-5 w-1/2'> {loading && selectedProduct == product?.id ? <i className='fas fa-spinner fa-spin'></i> : <><i className='fas fa-cart-plus'></i> <span> Add to Cart</span></>} </button>
                    <button disabled={loadingWishlist} onClick={() => addProductToWishlist(product?.id)} className='bg-slate-100 hover:bg-slate-200 flex justify-center items-center btn bg-light text-red-700 w-1/2'> {loadingWishlist && selectedWishlist == product?.id ? <i className='fas fa-spinner fa-spin'></i> : <><i className='far fa-heart'> </i> <span className='ms-1'> Add To Wishlist</span></>} </button>
                </div>


            </div>
        </div>


        <h2 className='text-3xl mb-5 text-black'>You may also like</h2>

        <div className="row gap-4 items-center justify-center">
            {relatedProduct?.length > 0 ? relatedProduct?.map((product) => (
                <div key={product?.id} className='w-full mx-10 md:mx-0 md:w-1/3 lg:w-1/5 shadow-lg md:gap-0 border-2 md:border-0 md:shadow-none bg-white rounded-lg'>
                    <div className="product group overflow-hidden border border-1 hover:border-emerald-600 rounded-lg shadow-md  transition-all relative">
                        <button onClick={() => addProductToWishlist(product?.id)} className='opacity-0 bg-slate-50 shadow-md flex justify-center items-center group-hover:opacity-100 btn bg-light text-red-700 rounded-full z-40 size-10 top-4 right-4 absolute'>
                            {loadingWishlist && selectedWishlist == product?.id ? <i className='fas fa-spinner fa-spin'></i> : <span><i className='far fa-heart'></i></span>}
                        </button>
                        <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                            <div className='overflow-hidden'><img className='size-full md:h-80 object-cover mb-2 md:w-80 m-auto group-hover:scale-105' src={product?.imageCover} alt="Product image" /></div>

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

                        <div className="link-cart pb-4 px-2 bg-slate-50">

                            <button disabled={loading} onClick={() => addProductToCart(product?.id)} className='btn w-full bg-green-500 hover:bg-green-600 text-white rounded-xl px-5'>
                                {loading && selectedProduct == product?.id ? <i className='fas fa-spinner fa-spin'></i> : <span> Add to Cart</span>}
                            </button>
                        </div>


                    </div>
                </div>
            )) : <>

                <div className='flex justify-center items-center w-full'>
                    <ClipLoader color='#059669' />
                </div>
            </>}
        </div>
    </>;
}
