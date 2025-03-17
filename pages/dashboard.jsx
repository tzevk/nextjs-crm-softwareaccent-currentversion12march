import Link from 'next/link';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <h2 className={styles.logo}>CRM</h2>
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/clients">Clients</Link></li>
          <li><Link href="/leads">Leads</Link></li>
          <li><Link href="/reports">Reports</Link></li>
          <li><Link href="/settings">Settings</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        <h1>Welcome to Dashboard</h1>
        <p>This is your CRM dashboard.</p>
      </main>
    </div>
  );
}