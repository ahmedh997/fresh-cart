import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';



export default function useProducts() {
    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let responseObject = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecent,
        staleTime: 800,
        select: (data) => data?.data?.data
    });

    return responseObject;
}
