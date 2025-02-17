import React, { useContext, useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, Links, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';




export default function Navbar() {

    

    let { userLogin, setUserLogin } = useContext(UserContext);

    let {numberItems} = useContext(CartContext)

    let {numberOfItems} = useContext(WishlistContext)


    let navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userToken');
        setUserLogin(null);
        navigate('/login');
    }

    return <>
        <nav className='bg-gray-100 fixed top-0 left-0 right-0 z-50 border-gray-200 px-4'>
            <div className="flex-wrap py-4 mx-auto flex justify-center lg:justify-between items-center max-w-screen-xl">

                <div className="left-sec flex justify-between gap-5">
                    <Link to={''}><img src={logo} width={'120px'} alt="logo fresh cart" /></Link>
                    {userLogin !== null ? <>
                        <ul className='flex justify-around m-0 gap-4 items-center'>
                            <li className='nav-links text-md font-normal'><NavLink className='text-slate-600' to={'/'}>Home</NavLink> </li>
                            <li className='nav-links text-md font-normal'><NavLink className='text-slate-600' to={'/products'}>Products</NavLink> </li>
                            <li className='nav-links text-md font-normal'><NavLink className='text-slate-600' to={'/categories'}>Categories</NavLink> </li>
                            <li className='nav-links text-md font-normal'><NavLink className='text-slate-600' to={'/brands'}>Brands</NavLink> </li>
                            <Link to={'/wishlist'} className='relative'>

                                <i className="fas fa-heart text-slate-600 mx-3 fa-md"> </i>
                                <span className='absolute text-[12px] text-white top-[-7px] right-[-5px] bg-emerald-600 size-5 rounded-full'>{numberOfItems}</span>
                            </Link>
                            <Link to={'/cart'} className='relative'>

                                <i className='fas fa-cart-shopping text-slate-600 mx-3 fa-md'></i>
                                <span className='absolute text-[12px] text-white top-[-7px] right-[-5px] bg-emerald-600 size-5 rounded-full'>{numberItems}</span>
                            </Link>
                            
                        </ul>
                    </> : null}
                </div>

                <div className="right-sec flex items-center space-x-6">
                    <ul className='flex justify-around items-center m-0 gap-4'>



                        <li className='text-md my-2 text-slate-600 font-normal flex justify-between'>
                            <i className='fab fa-facebook mx-2 fa-md'></i>
                            <i className='fab fa-twitter mx-2 fa-md'></i>
                            <i className='fab fa-instagram mx-2 fa-md'></i>
                            <i className='fab fa-tiktok mx-2 fa-md'></i>
                            <i className='fab fa-youtube mx-2 fa-md'></i>
                        </li>


                        {userLogin !== null ? <>

                            <li onClick={logout} className='text-md font-normal'><NavLink className='text-slate-600' to={'/'}>  Logout <i className='fa-solid fa-right-from-bracket text-red-700'></i></NavLink> </li>
                        </> : <>
                            <li className='text-md font-normal'><NavLink className='text-slate-600' to={'/login'}>Login</NavLink> </li>
                            <li className='text-md font-normal'><NavLink className='text-slate-600' to={'/register'}>Register</NavLink> </li>

                        </>}


                    </ul>

                </div>
            </div>
        </nav>
    </>;
}
