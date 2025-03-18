import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <Navbar />
      <main className={styles.content}>
        <h1>DASHBOARD</h1>
        <div className={styles.cards}>
          <div className={styles.card}>💰 $1k Total Sales</div>
          <div className={styles.card}>📦 300 Orders</div>
          <div className={styles.card}>✔ 5 Products Sold</div>
          <div className={styles.card}>👥 8 New Customers</div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;