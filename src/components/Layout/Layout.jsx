import React, { useEffect, useState } from 'react';
import Style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    const [counter, setcounter] = useState(0);
    useEffect(
        () => {
            setcounter(counter + 1);
        }, []);
    return <>

        <Navbar />

        <div className="container my-5 py-20 lg:py-10">

            <Outlet />

        </div>

        <Footer />

    </>;
}
