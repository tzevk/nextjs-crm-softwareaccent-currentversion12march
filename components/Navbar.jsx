import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);
  const navRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.navLeft}>
        {/* CLIENTS */}
        <div className={styles.dropdown}>
          <button onClick={() => toggleDropdown("clients")} className={styles.dropdownButton}>
            Clients ▾
          </button>
          {dropdown === "clients" && (
            <div className={styles.dropdownMenu}>
              <Link href="/clients">All Clients</Link>
              <Link href="/clients/add">Add Client</Link>
            </div>
          )}
        </div>

        {/* DEALS */}
        <div className={styles.dropdown}>
          <button onClick={() => toggleDropdown("deals")} className={styles.dropdownButton}>
            Deals ▾
          </button>
          {dropdown === "deals" && (
            <div className={styles.dropdownMenu}>
              <Link href="/deals/active">Active Deals</Link>
              <Link href="/deals/closed">Closed Deals</Link>
            </div>
          )}
        </div>

        {/* REPORTS */}
        <div className={styles.dropdown}>
          <button onClick={() => toggleDropdown("reports")} className={styles.dropdownButton}>
            Reports ▾
          </button>
          {dropdown === "reports" && (
            <div className={styles.dropdownMenu}>
              <Link href="/reports/sales">Sales Report</Link>
              <Link href="/reports/users">User Report</Link>
            </div>
          )}
        </div>
      </div>

      <div className={styles.navRight}>
        <div className={styles.avatar}>G</div>
        <span className={styles.username}>Guest (User)</span>
      </div>
    </nav>
  );
};

export default Navbar;