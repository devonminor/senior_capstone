import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../pages/Layout'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
