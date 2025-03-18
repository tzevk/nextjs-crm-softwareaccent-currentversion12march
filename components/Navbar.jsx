import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState("User");

  useEffect(() => {
    const sessionUser = Cookies.get("session");
    const sessionRole = Cookies.get("role");

    if (sessionUser) setUsername(sessionUser);
    if (sessionRole) setRole(sessionRole);
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input type="text" className={styles.search} placeholder="🔍 Search here..." />
      </div>

      {/* User Profile & Notification */}
      <div className={styles.userProfile}>
        <span className={styles.notification}>🔔</span>
        <div className={styles.user}>
          {username} <span className={styles.role}>({role})</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;