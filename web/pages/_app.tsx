import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Layout from '../pages/Layout';
import '../styles/globals.css';
import React, {Dispatch, useState} from 'react';
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const {course_id, lecture_id} = router.query;

    console.log(course_id);
        
    return (
        <Layout course_id={course_id}>
            <Component {...pageProps} />
        </Layout>
    )
}
