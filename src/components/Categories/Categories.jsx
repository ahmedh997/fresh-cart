import React, { useEffect, useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';

export default function Categories() {

    const [categories, setcategories] = useState([]);


    function getCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((res) => {
                setcategories(res.data.data);
            });

    }

    useEffect(() => {
        getCategories();
    }, []);
    return <>





        <div className="flex justify-evenly items-center flex-wrap gap-3">
            {categories.map((category) =>


                <div key={category._id}>
                    <img src={category.image} className='w-full h-[200px] object-cover' alt="Category Image" />
                    <h4 className='my-3 text-slate-700'>{category.name}</h4>

                </div>


            )}

        </div>






    </>;
}
