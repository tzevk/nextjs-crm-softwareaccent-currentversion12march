"Use client"
import styles from '../styles/login.module.css'
import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function LoginPage({ username }) {
  const router = useRouter()
  const { msg } = router.query
    return (
      <Layout pageTitle="Login">
          <div className={styles.loginBox}>
            {/* Logo */}
            <Image 
              src="/accent.png" 
              alt="Accent Logo" 
              className={styles.logo} 
              width={280} 
              height={280} 
              priority
            />

            {/* Login Form */}
            <form action='/api/login' method='POST' className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  id="username"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className={styles.input}
                />
              </div>
  
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  className={styles.input}
                />
                <Link href="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
  
              {/* Submit Button */}
              <button type="submit" className={styles.button}>Continue</button>
            </form>
  
            {/* Sign-up Link */}
            <p className={styles.signUpText}>
              Don't have an account? <Link href="/signup" className={styles.signUpLink}>Sign up</Link>
            </p>
          </div>
      </Layout>
    );
  }


export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  const username = getCookie('username', { req, res });
  if (username != undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    };
  }
  return { props: { username: false } };
}