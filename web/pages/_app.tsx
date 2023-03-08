import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../pages/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { course_id } = router.query;

    return (
        <Layout course_id={course_id}>
            <Component {...pageProps} />
        </Layout>
    );
}
