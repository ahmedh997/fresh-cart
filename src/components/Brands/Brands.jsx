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





        <div className="flex justify-center items-center flex-wrap gap-3">
            {loading ?

                <div className='flex justify-center items-center w-full mt-24'>
                    <ClipLoader size={60} color='#059669' />
                </div>
                : brands?.map((brand) =>


                    <div key={brand?._id}>
                        <img src={brand?.image} className='w-full h-[200px] object-cover' alt="brands Image" />
                        <h4 className='my-3 text-slate-700'>{brand?.name}</h4>

                    </div>


                )}

        </div>






    </>;
}
