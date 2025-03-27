import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

    let headers = {token: localStorage.getItem('userToken')};

    const [cartId, setcartId] = useState(0)


    const [numberItems, setnumberItems] = useState(null)



    function addToCart(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
             productId
         }, {
             headers
         })
         .then((res)=>res)
         .catch((err)=>err)
     }

    function getCartItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((res)=> {
            setnumberItems(res?.data?.numOfCartItems)
            setcartId(res?.data?.data?._id)
            return res
        })   
        .catch((err)=>err)
    }

    
    function updateCartItems(productId, newCount) {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: newCount
        }, {
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    function deleteCartItems(productId) {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    function checkOut(cartId, url, formData) {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
        shippingAddress: formData
       },{
        headers
       }
    
    )
        .then((res)=>res)
        .catch((err)=>err)
    }


    return <CartContext.Provider value={{addToCart, getCartItems, updateCartItems, deleteCartItems, checkOut, cartId, numberItems, setnumberItems}}>

        {props.children}

    </CartContext.Provider>;

}