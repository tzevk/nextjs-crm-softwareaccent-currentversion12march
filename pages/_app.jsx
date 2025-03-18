// import '../styles/global.css';
// import '../styles/login.module.css';
// import { CookiesProvider } from 'react-cookie';
// import { useRouter } from 'next/router';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import HomePage from './index';

// export default function App({ Component, pageProps }) {
//   const router = useRouter();

//   // Pages where Sidebar & Navbar should NOT appear
//   const noLayoutPages = ["/login", "/register", "/forgot-password"];

//   return (
//     <CookiesProvider>
//       {/* Check if current page is in noLayoutPages */}
//       {!noLayoutPages.includes(router.pathname) && (
//         <>
//           {/* <Sidebar /> */}
//           {/* <Navbar /> */}
//           {/* <HomePage/> */}
//         </>
//       )}
      
//       <Component {...pageProps} />
//     </CookiesProvider>
//   );
// }


// pages/_app.jsx

// pages/_app.jsx

import '../styles/global.css';
import '../styles/login.module.css';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Pages where Sidebar & Navbar should NOT appear
  const noLayoutPages = ['/login', '/register', '/forgot-password', '/'];

  return (
    <CookiesProvider>
      {/* Hide sidebar/nav on pages listed above */}
      {!noLayoutPages.includes(router.pathname) && (
        <>
          <Sidebar />
          <Navbar />
        </>
      )}

      {/* Render whichever page the user navigates to */}
      <Component {...pageProps} />
    </CookiesProvider>
  );
}