import React, { useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import slider1 from '../../assets/images/slider-image-1.jpeg';
import slider2 from '../../assets/images/slider-image-2.jpeg';
import slider3 from '../../assets/images/slider-image-3.jpeg';
import slider4 from '../../assets/images/grocery-banner.png';
import slider5 from '../../assets/images/grocery-banner-2.jpeg';
import Slider from 'react-slick';


export default function MainSlider() {
    const [counter, setcounter] = useState(0);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
    };
    useEffect(
        () => {
            setcounter(counter + 1);
        }, []);
    return <>
        <div className="row my-5">
            <div className="w-full md:w-3/4">

                <Slider {...settings}>
                    <img src={slider1} className='w-full md:h-[400px] object-cover' alt="Slider Image" />
                    <img src={slider1} className='w-full md:h-[400px] object-cover' alt="Slider Image" />
                    <img src={slider1} className='w-full md:h-[400px] object-cover' alt="Slider Image" />
                </Slider>

            </div>
            <div className="w-1/2 md:w-1/4 flex md:block">
                <img src={slider2} className='w-full md:h-[200px] object-cover' alt="Slider Image" />
                <img src={slider3} className='w-full md:h-[200px] object-cover' alt="Slider Image" />
            </div>
        </div>

    </>;
}
