import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {




    let headers = {token: localStorage.getItem('userToken')};


    const [numberOfItems, setnumberOfItems] = useState(null)



    function addToWishlist(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
             productId
         }, {
             headers
         })
         .then((res)=>res)
         .catch((err)=>err)
     }

    function getWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        })
        .then((res)=> {
            console.log(res)
            setnumberOfItems(res.data.count)
            return res
        })   
        .catch((err)=>err)
    }

    
    function deleteWishlist(productId) {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }



    return <WishlistContext.Provider value={{addToWishlist, getWishlist,deleteWishlist, numberOfItems, setnumberOfItems }}>

        {props.children}

    </WishlistContext.Provider>;

}