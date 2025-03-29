import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Brands() {
    const [brands, setbrands] = useState([]);
    const [loading, setLoading] = useState(true);



    function getBrands() {
        axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then((res) => {
                setbrands(res?.data?.data);
                setLoading(false);
                console.log(res?.data?.data);
            });

    }

    useEffect(() => {
        getBrands();
    }, []);
    return <>



        <div className="text my-4">
            <h1 className='mb-4'>Brands</h1>
            <span>A brand is a product or a business with a distinct identity among consumers</span>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-3">
            {loading ?

                <div className='flex justify-center items-center w-full mt-24 p-16'>
                    <ClipLoader size={60} color='#059669' />
                </div>
                : brands?.map((brand) =>


                    <div key={brand?._id} className='md:w-1/4 lg:w-1/5 border-2 rounded-xl hover:shadow-md'>
                        <img src={brand?.image} className='w-full object-contain' alt="brands Image" />
                        <h4 className='my-3 text-slate-700'>{brand?.name}</h4>

                    </div>


                )}

        </div>






    </>;
}
