import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import styles from '../styles/login.module.css'; 
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setLoading(true);
        setError("");

        const formData = {
            username: e.target.username.value,
            password: e.target.password.value,
            role: e.target.role.value
        };

        try {
            console.log("🔄 Sending Login Request...");
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("🔍 API Response:", data);

            if (response.ok) {
                console.log("✅ Login Success!");

                // 🚀 Redirect without cookies
                setTimeout(() => {
                    console.log("🚀 Redirecting to dashboard...");
                    router.push('/dashboard');
                }, 300);
            } else {
                console.log("❌ Login Failed:", data.message);
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            console.log("❌ Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout pageTitle="Login">
            <div className={styles.container}>
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

                    {error && <h3 className={styles.error}>{error}</h3>}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">Username</label>
                            <input name="username" type="text" placeholder="Username" required className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input name="password" type="password" placeholder="Password" required className={styles.input} />
                        </div>

                        {/* ✅ Role Dropdown */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="role">Role</label>
                            <select name="role" required className={styles.input}>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="project manager">Project Manager</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? "Logging in..." : "Continue"}
                        </button>
                    </form>

                    <p className={styles.signUpText}>
                        Don't have an account?{' '}
                        <Link href="/signup" className={styles.signUpLink}>Sign Up</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}