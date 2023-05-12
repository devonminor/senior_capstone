/*
 *  Loader.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  Spinning Animation to indicate loading.
 *
 *  Last updated: 05/12/2023
 */

import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                width: '50px',
                height: '50px',
                margin: 'auto',
                display: 'block',
            }}
        ></Spinner>
    );
};

export default Loader;
