import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';





export default function ProductDetails() {

    let { addToCart, setnumberItems, numberItems } = useContext(CartContext);

    let { addToWishlist, numberOfItems, setnumberOfItems } = useContext(WishlistContext);


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

        setnumberOfItems(numberOfItems + 1);
        setselectedWishlist(productId);
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



    let { id, category } = useParams();

    const [product, setproduct] = useState(null);
    const [relatedProduct, setrelatedProduct] = useState([]);
    const [selectedProduct, setselectedProduct] = useState(0);
    const [selectedWishlist, setselectedWishlist] = useState(0);
    const [loading, setloading] = useState(false);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    function getProduct(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((res) => {
                console.log(res.data.data);
                setproduct(res.data.data);
                setselectedProduct(id);
            })
            .catch((res) => {
                console.log(res);

            });
    }

    function getAllProducts() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then((res) => {
                let related = res.data.data.filter((product) => product.category.name == category);
                setrelatedProduct(related);

            });
    }

    useEffect(() => {
        getProduct(id);
        getAllProducts();
    }, [id, category]);

    return <>

        <div className="row items-center w-[90%] m-auto">
            <div className="w-full md:w-1/4 my-4">
                 
                <Slider {...settings}>
                    {product?.images.map((src) => <img src={src} className='w-full p-3' />)}
                </Slider>
            </div>
            
            <div className="md:w-3/4 m-auto md:m-0 md:text-left p-4 relative">
                 
                <h3 className='text-black font-bold text-3xl capitalize'>{product?.title}</h3>
                <h4 className='text-gray-600 my-4'>{product?.description}</h4>
                <h4 className='text-emerald-600 my-4'>{product?.category.name}</h4>
                <div className="price-rating flex justify-between p-3">
                    <span className='text-black'>{product?.price}EGP</span>
                    <span className='text-black'><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage}</span>
                </div>
                <button onClick={() => addProductToCart(product._id)} className='btn bg-emerald-600 text-white rounded-xl px-5 py-2 w-full'>
                    {loading && selectedProduct == product._id ? <i className='fas fa-spinner fa-spin'></i> : "Add to Cart"}
                </button>
                <button onClick={() => addProductToWishlist(product._id)} className='btn bg-yellow-600 text-white rounded-xl px-5 py-2 w-full my-3'>
                     Add to wishlist
                </button>

            </div>
        </div>


        <h2 className='font-bold text-2xl text-black'>Related Products</h2>

        <div className="row w-[90%] m-auto">
            {relatedProduct.length > 0 ? relatedProduct.map((product) => (
                <div key={product.id} className='w-full md:w-1/4 lg:w-1/5 xl:w-1/6 mt-5 shadow-lg mx-5 md:mx-0 border-2 md:border-0 md:shadow-none bg-white rounded-lg'>
                    <div className="product p-5 group overflow-hidden ">
                        
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <img className=' w-[200px] h-[200px] object-cover m-auto' src={product.imageCover} alt="Product image" />
                            <h3 className='text-emerald-500 mt-2 font-light'>{product.category.name}</h3>
                            <h3 className='text-black mb-3 font-semibold'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                            <hr />
                            <div className='text-black price-rating flex justify-between p-3'>
                                <span>{product.price}EGP</span>
                                <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
                            </div>
                        </Link>
                        <button onClick={() => addProductToCart(product.id)} className='btn bg-emerald-600 text-white rounded-xl px-5 py-2 w-full'>
                            {loading && selectedProduct == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add to Cart"}
                        </button>
                        <button onClick={() => addProductToWishlist(product.id)} className='btn bg-yellow-600 text-white rounded-xl p-2 w-full my-3'>
                             Add To Wishlist
                        </button>

                    </div>
                </div>
            )) : <>

                <div className='flex justify-center items-center w-full'>
                    <ClimbingBoxLoader color='#059669' />
                </div>
            </>}
        </div>
    </>;
}
