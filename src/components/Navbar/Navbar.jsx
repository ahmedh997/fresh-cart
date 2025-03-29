import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, Links, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';




export default function Navbar() {


    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    let { userLogin, setUserLogin } = useContext(UserContext);

    let { numberItems, getCartItems } = useContext(CartContext);

    let { numberOfItems, getWishlist } = useContext(WishlistContext);


    let navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userToken');
        setUserLogin(null);
        navigate('/login');
    }

    useEffect(() => {
        setIsOpen(false);

        const path = location.pathname;
        let title = 'Fresh Cart';

        if (path.includes('/')) title = "Home | Fresh Cart";
        if (path.includes('/products')) title = "Products | Fresh Cart";
        if (path.includes('/categories')) title = "Categories | Fresh Cart";
        if (path.includes('/brands')) title = "Brands | Fresh Cart";
        if (path.includes('/favorites')) title = "Favorites | Fresh Cart";
        if (path.includes('/cart')) title = "Cart | Fresh Cart";
        if (path.includes('/wishlist')) title = "Wishlist | Fresh Cart";

        document.title = title;


        getCartItems();
        getWishlist();



    }, [location.pathname]);


    return <>
        <nav className='bg-gray-100 fixed top-0 left-0 right-0 z-50 border-gray-200 px-4 border-b-2'>
            <div className="flex-wrap py-4 mx-auto flex justify-between items-center max-w-screen-xl">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <Link className='w-[12rem] my-3 md:my-2' to={''}>
                        <img src={logo} alt="logo fresh cart" />
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none navbar-menu"
                    >
                        {isOpen ? (
                            <i className="fas fa-times fa-lg"></i>
                        ) : (
                            <i className="fas fa-bars fa-lg"></i>
                        )}
                    </button>
                </div>

                {/* Navigation links - shown on desktop, conditionally on mobile */}
                <div className={`${isOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full`}>
                    <div className="left-sec flex flex-col lg:flex-row lg:justify-between gap-5">
                        {userLogin !== null && (
                            <ul className='flex flex-col lg:flex-row items-center gap-4 mb-3 md:mb-0'>
                                <li className='nav-links text-md font-normal'>
                                    <NavLink className='text-slate-600' to={'/'}>Home</NavLink>
                                </li>
                                <li className='nav-links text-md font-normal'>
                                    <NavLink className='text-slate-600' to={'/products'}>Products</NavLink>
                                </li>
                                <li className='nav-links text-md font-normal'>
                                    <NavLink className='text-slate-600' to={'/categories'}>Categories</NavLink>
                                </li>
                                <li className='nav-links text-md font-normal'>
                                    <NavLink className='text-slate-600' to={'/brands'}>Brands</NavLink>
                                </li>
                                <li className='nav-links'>
                                    <Link to={'/wishlist'} className='relative'>
                                        <i className="fas fa-heart text-slate-600 unique-icons mx-3 fa-md"></i>
                                        <span className='absolute text-[12px] text-white top-[-7px] right-[-5px] bg-green-500 hover:bg-green-600 size-5 text-center rounded-full'>
                                            {numberOfItems == null ? <i className='fas fa-spin fa-spinner'></i> : numberOfItems}
                                        </span>
                                    </Link>
                                </li>
                                <li className='nav-links'>
                                    <Link to={'/cart'} className='relative'>
                                        <i className='fas fa-cart-shopping unique-icons text-slate-600 mx-3 fa-md'></i>
                                        <span className='absolute text-[12px] text-white top-[-7px] right-[-5px] bg-green-500 hover:bg-green-600 size-5 text-center rounded-full'>
                                            {numberItems == null ? <i className='fas fa-spin fa-spinner'></i> : numberItems}
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className={`${isOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full`}>

                    <div className="right-sec flex flex-col lg:flex-row items-center lg:space-x-6">
                        <ul className='flex flex-col lg:flex-row items-center gap-4'>
                            <li className='text-md my-2 text-slate-600 font-normal flex justify-between'>
                                <i role='button' className='fab fa-facebook mx-2 fa-md'></i>
                                <i role='button' className='fab fa-twitter mx-2 fa-md'></i>
                                <i role='button' className='fab fa-instagram mx-2 fa-md'></i>
                                <i role='button' className='fab fa-tiktok mx-2 fa-md'></i>
                                <i role='button' className='fab fa-youtube mx-2 fa-md'></i>
                            </li>

                            {userLogin !== null ? (
                                <li onClick={logout} className='text-md font-normal'>
                                    <NavLink className='text-slate-600' to={'/login'}>
                                        Logout <i className='fa-solid fa-right-from-bracket text-red-700'></i>
                                    </NavLink>
                                </li>
                            ) : (
                                <>
                                    <li className='text-md font-normal'>
                                        <NavLink className='text-slate-600' to={'/login'}>Login</NavLink>
                                    </li>
                                    <li className='text-md font-normal'>
                                        <NavLink className='text-slate-600' to={'/register'}>Register</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav >

    </>;
}
