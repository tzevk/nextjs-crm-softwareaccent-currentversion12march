import '../styles/global.css';
import '../styles/login.module.css';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.pathname.toLowerCase(); // Convert path to lowercase for safety

  // Pages where Sidebar & Navbar should NOT appear
  const noLayoutPages = ['/login', '/signup', '/forgot-password', '/'];

  // Hide Sidebar & Navbar for any page under /admin (e.g., /admin/index, /admin/dashboard, etc.)
  const isAdminPage = currentPath.startsWith('/admin/login');

  return (
    <CookiesProvider>
      {/* Check if the current path is in noLayoutPages OR an admin page */}
      {!noLayoutPages.includes(currentPath) && !isAdminPage && (
        <>
          <Sidebar />
        </>
      )}

      {/* Render whichever page the user navigates to */}
      <Component {...pageProps} />
    </CookiesProvider>
  );
}