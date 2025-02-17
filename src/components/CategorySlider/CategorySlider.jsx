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
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return <>

        <h2 className='my-3 font-semibold text-left text-slate-700'>Shop Popular Categories</h2>

        <Slider {...settings}>

            {categories.map((category) => <div key={category._id}>
                <img src={category.image} className='size-28 md:w-full md:h-[250px] object-cover' alt="Category Image" />
                <h4 className='m-3 text-slate-700'>{category.name}</h4>
            </div>
            )}

        </Slider>
    </>;
}
