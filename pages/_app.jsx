import '../styles/global.css';
import '../styles/login.module.css';
import { CookiesProvider } from 'react-cookie';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}