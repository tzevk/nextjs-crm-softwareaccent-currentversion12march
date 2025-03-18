import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import styles from "../styles/dashboard.module.css";

export default function Dashboard() {
  const [leadCounts, setLeadCounts] = useState({
    Open: 0,
    "Under Discussion": 0,
    Awaiting: 0,
    Awarded: 0,
    Closed: 0,
  });

  const [selectedYear, setSelectedYear] = useState(2024); // Ensure it's a number

  useEffect(() => {
    const fetchLeadCounts = async () => {
      try {
        const response = await fetch(`/api/leads/status?year=${selectedYear}`);
        if (!response.ok) {
          throw new Error("Failed to fetch lead counts");
        }
        const data = await response.json();
        setLeadCounts(data);
      } catch (error) {
        console.error("Error fetching lead counts:", error);
      }
    };

    fetchLeadCounts();
  }, [selectedYear]);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <main className={styles.content}>
          <h1 className={styles.title}>Dashboard</h1>

          {/* Year Selector */}
          <div className={styles.filterContainer}>
            <label htmlFor="yearSelect">Filter by Year:</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>
          </div>

          {/* Lead Counts Table */}
          <div className={styles.tableContainer}>
            <table className={styles.dashboardTable}>
              <thead>
                <tr>
                  <th>Open</th>
                  <th>Under Discussion</th>
                  <th>Awaiting</th>
                  <th>Awarded</th>
                  <th>Closed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{leadCounts.Open}</td>
                  <td>{leadCounts["Under Discussion"]}</td>
                  <td>{leadCounts.Awaiting}</td>
                  <td>{leadCounts.Awarded}</td>
                  <td>{leadCounts.Closed}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}