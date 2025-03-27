import { useState } from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContext from './Context/CartContext';
import Checkout from './components/Checkout/Checkout';
import Cart from './components/Cart/Cart';
import Allorders from './components/Allorders/Allorders';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistContext from './Context/WishlistContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ChangeMyPassword from './components/ChangeMyPassword/ChangeMyPassword';




let query = new QueryClient();

let router = createHashRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'changemypassword', element: <ChangeMyPassword /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'brands', element: <ProtectedRoute><Brands /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'resetpassword', element: <ForgetPassword /> },
      { path: 'verifycode', element: <VerifyCode /> },
      { path: '*', element: <NotFound /> },
    ]
  }
]);

function App() {


  return <>




    <CartContext>
      <WishlistContext>

        <QueryClientProvider client={query}>

          <UserContextProvider>

            <Toaster position="top-right" />
            <RouterProvider router={router}>

            </RouterProvider>
            <ReactQueryDevtools />
          </UserContextProvider>

        </QueryClientProvider>

      </WishlistContext>

    </CartContext>


  </>;
}

export default App;
