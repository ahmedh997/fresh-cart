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
        <RecentProudcts />
    </>;
}
