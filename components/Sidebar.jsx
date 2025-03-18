import React from "react";
import { Home, BarChart, ShoppingCart, HelpCircle, Settings, LogOut, Users } from "lucide-react"; 
import styles from "../styles/sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      {/* User Section */}
      <div className={styles.userSection}>
        <div className={styles.userLogo}>
          <Users size={28} className={styles.userIcon} />
        </div>
        <span className={styles.username}>User</span>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navMenu}>
        <a href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
          <Home size={20} />
          Dashboard
        </a>
        <a href="/leads" className={styles.navItem}>
          <BarChart size={20} />
          Leads
        </a>
        <a href="/projects" className={styles.navItem}>
          <ShoppingCart size={20} />
          Projects
        </a>
        <a href="/help" className={styles.navItem}>
          <HelpCircle size={20} />
          Help
        </a>
        <a href="/settings" className={styles.navItem}>
          <Settings size={20} />
          Settings
        </a>
        <a href="/logout" className={`${styles.navItem} ${styles.logout}`}>
          <LogOut size={20} />
          Sign Out
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;