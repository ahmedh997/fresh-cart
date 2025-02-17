import React, { useEffect, useState } from 'react';
import Style from './CategorySlider.module.css';
import Slider from 'react-slick';
import axios from 'axios';

export default function CategorySlider() {

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

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    return <>

        <h2 className='my-3 font-semibold text-left text-slate-700'>Shop Popular Categories</h2>

        <Slider {...settings}>

            {categories.map((category) => <div key={category._id}>
                <img src={category.image} className='w-full h-[200px] object-cover' alt="Category Image" />
                <h4 className='my-3 text-slate-700'>{category.name}</h4>
            </div>
            )}

        </Slider>
    </>;
}
