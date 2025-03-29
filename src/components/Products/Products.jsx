import React, { useEffect, useState } from 'react';
import Style from './Products.module.css';
import RecentProudcts from '../RecentProudcts/RecentProudcts';

export default function Products() {
    const [counter, setcounter] = useState(0);
    useEffect(
        () => {
            setcounter(counter + 1);
        }, []);
    return <>


        <div className="text my-4">
            <h1 className='mb-4'>Shop All Products</h1>
            <span>A category is a product or a business with a distinct identity among consumers</span>
        </div>
        <RecentProudcts />



    </>;
}
