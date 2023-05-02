import { UserProvider } from '@auth0/nextjs-auth0/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

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
