import React, { useContext, useEffect, useState } from 'react';
import Style from './Wishlist.module.css';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import ClipLoader from 'react-spinners/ClipLoader';
import emptyCart from '../../assets/images/empty cart.png';


export default function Wishlist() {


    let { addToCart, setnumberItems, numberItems } = useContext(CartContext);


    let { getWishlist, deleteWishlist } = useContext(WishlistContext);

    const [wishlistDetails, setwishlistDetails] = useState(null);



    const [loading, setloading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(true);


    const [selectedProduct, setselectedProduct] = useState(0);

    const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(0);


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

    async function getUserWishlist() {
        let list = await getWishlist();
        setwishlistDetails(list?.data?.data);
        setloading(false);
        console.log(list);
    }


    async function deleteItemWishlist(productId) {

        setSelectedDeleteProduct(productId);
        setLoadingDelete(true);

        let remove = await deleteWishlist(productId);


        if (remove.data.status == 'success') {
            setLoadingDelete(false);
            toast.success(remove?.data?.message);
            await getUserWishlist();
        }
        else {
            setLoadingDelete(false);
            toast.error('Something Went Wrong');
        }
        console.log(remove);
    }





    useEffect(() => {

        getUserWishlist();

    }, []);



    return <>

        <div className="text my-4">
            <h1 className='mb-4'>You Favorite Items</h1>
        </div>

        {wishlistDetails?.length > 0 ? <>
            <div className="flex w-[90%] m-auto mt-9">
                <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
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
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistDetails?.map((product) => <tr key={product._id} className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                                <td className="p-4">
                                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product.title}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product.price} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => addProductToCart(product.id)} className='btn bg-green-500 hover:bg-green-600 text-white rounded-xl p-2 w-full my-5'>
                                        {loading && selectedProduct == product.id ? <i className='fas fa-spinner fa-spin'></i> : <span><i className='fas fa-shopping-cart'></i> Add to Cart</span>}
                                    </button>
                                    <a onClick={() => deleteItemWishlist(product.id)} role='button' className="flex gap-1 justify-center items-center font-medium text-red-600">{loadingDelete && selectedDeleteProduct == product.id ? <i className='fas fa-spinner fa-spin'></i> : <><i className="fa-solid fa-trash-can"></i> Remove</>}</a>
                                </td>
                            </tr>

                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </> : loading ?

            <div className='flex justify-center items-center w-full mt-32  p-16'>
                <ClipLoader size={60} color='#059669' />
            </div> : <>
                <div className="row flex-column items-center justify-center">

                    <img width={300} src={emptyCart} alt="Empty cart" />
                </div>
                <h4>No items to show</h4>
            </>}


    </>;




}
