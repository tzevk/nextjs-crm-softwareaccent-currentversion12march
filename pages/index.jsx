import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'

export default function HomePage( {username} ) {
    return (
        <Layout pageTitle="Home">
            <div className="layout">
            <div className="glass-card">
        {username ?
        <>
            <h2>Hi {username}</h2>
            <div className="buttons">
            <Link href="/profile" className="login-btn" >Profile</Link><br/>
            <Link href="/api/logout" className="signup-btn" >Logout</Link>
            </div>
        </>: 
        <>
            <div className="buttons">
            <Link href="/login" className="login-btn" >LOGIN</Link><br/>
            <Link href="/signup" className="signup-btn" >SIGN UP</Link>
            </div>
        </>
        }
        </div>

        </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        username = false;
    }
    return { props: {username} };
};