import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/signup.module.css'; 
import Image from 'next/image'

export default function SignupPage( {username} ) {
    const router = useRouter()
    const { msg } = router.query
    return (
        <Layout pageTitle="Signup">
            <div className={styles.container}>
                <div className={styles.signupBox}>
                                {/* Logo */}
            <Image 
              src="/accent.png" 
              alt="Accent Logo" 
              className={styles.logo} 
              width={280} 
              height={280} 
              priority
            />


                    {msg && <h3 className="red">{msg}</h3>}

                    <form action='/api/signup' method='POST' className={styles.form}>
                    <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
        <input 
            minLength="3" 
            name="username" 
            id="username" 
            type="text" 
            placeholder='Username' 
            required 
            className={styles.input} 
        />
    </div>

    <div className={styles.inputGroup}>
    <label htmlFor="password">Password</label>
        <input 
            minLength="5" 
            name="password" 
            id="password" 
            type="password" 
            placeholder='Password' 
            required 
            className={styles.input} 
        />
    </div>

    <div className={styles.inputGroup}>
    <label htmlFor="password">Enter your password again</label>
        <input 
            minLength="5" 
            name="passwordagain" 
            id="passwordagain" 
            type="password" 
            placeholder='Confirm Password' 
            required 
            className={styles.input} 
        />
    </div>

                        <button type="submit" className={styles.button}>Sign Up</button>
                    </form>

                    <p className={styles.signUpText}>
                        Already have an account?{' '}
                        <Link href="/login" className={styles.signUpLink}>Log in</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username != undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: {username:false} };
};