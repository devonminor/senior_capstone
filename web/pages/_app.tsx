/*
 *  _app.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This file is the root component of the application. It provides the Auth0
 *  context to all pages and provides the layout for all pages.
 *
 *  Last updated: 05/12/2023
 */

import { UserProvider } from '@auth0/nextjs-auth0/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { course_id } = router.query;

    return (
        <UserProvider>
            <Layout course_id={course_id}>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}
