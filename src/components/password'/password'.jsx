import React, { useEffect, useState } from 'react';
import Style from './Password.module.css';

export default function Password() {
    const [counter, setcounter] = useState(0);
    useEffect(
        () => {
            setcounter(counter + 1);
        }, []);
    return <>

        <div>Password</div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque tenetur facilis rem id, et a consectetur, dolores maxime, repudiandae recusandae quia explicabo eligendi ullam reprehenderit harum natus iusto voluptatem! Labore.</h1>
    </>;
}
