import React, { useEffect, useState } from 'react';
import Style from './NotFound.module.css';

export default function NotFound() {
    const [counter, setcounter] = useState(0);
    useEffect(
        () => {
            setcounter(counter + 1);
        }, []);
    return <>

        <div>NotFound</div>
    </>;
}
