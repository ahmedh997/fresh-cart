import React, { useEffect, useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Categories() {

    const [categories, setcategories] = useState([]);
    const [loading, setLoading] = useState(true);


    function getCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((res) => {
                setcategories(res.data.data);
                setLoading(false);
            });

    }

    useEffect(() => {
        getCategories();
    }, []);
    return <>




        <div className="text my-4">
            <h1 className='mb-4'>Categories</h1>
            <span>A category is a product or a business with a distinct identity among consumers</span>
        </div>

        <div className="flex justify-evenly items-center flex-wrap gap-2 mt-9">
            {loading ?

                <div className='flex justify-center items-center w-full mt-24 p-16'>
                    <ClipLoader size={60} color='#059669' />
                </div>
                : <>



                    {categories?.map((category) =>


                        <div key={category?._id} className='w-1/7 border-2 rounded-xl hover:shadow-md'>
                            <img loading='lazy' src={category?.image} className={' size-52 object-cover m-auto rounded-lg'} alt="Category Image" />
                            <h4 className='my-3 text-slate-700'>{category?.name}</h4>
                        </div>)

                    } </>}

        </div>






    </>;
}
