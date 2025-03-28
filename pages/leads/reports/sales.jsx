import { useEffect, useState } from "react";
import styles from "../../../styles/sales.module.css";
import Head from "next/head";
import { CSVLink } from "react-csv";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesReport() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("/api/reports/sales")
      .then((res) => res.json())
      .then(setLeads)
      .catch((err) => console.error("Failed to load sales report", err));
  }, []);

  const totalRevenue = leads.reduce((acc, l) => acc + (l.quotationAmount || 0), 0);

  return (
    <>
      <Head>
        <title>Sales Report | CRM</title>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>Sales Report</h1>

        {/* Summary Cards */}
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Total Leads</h3>
            <p className={styles.cardValue}>{leads.length}</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Total Revenue</h3>
            <p className={styles.cardValue}>₹ {totalRevenue.toLocaleString()}</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Export</h3>
            <CSVLink
              data={leads}
              filename={"sales-report.csv"}
              className={styles.exportBtn}
              target="_blank"
            >
              📥 Download CSV
            </CSVLink>
          </div>
        </div>

        {/* Chart Card */}
        <div className={styles.cardChart}>
  <h3 className={styles.cardTitle}>Revenue by Company</h3>
  <div className={styles.chartResponsive}>
    <Bar
      data={{
        labels: leads.map((l) => l.companyName),
        datasets: [
          {
            label: "Amount",
            data: leads.map((l) => l.quotationAmount),
            backgroundColor: "#6A0DAD"
          }
        ]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }}
    />
  </div>
</div>

        {/* Lead Cards */}
        <div className={styles.cardGrid}>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <div className={styles.card} key={lead._id}>
                <h3 className={styles.cardTitle}>{lead.companyName}</h3>
                <p><strong>Enquiry #:</strong> {lead.enquiryNumber}</p>
                <p><strong>Amount:</strong> ₹ {lead.quotationAmount}</p>
                <p><strong>Status:</strong> {lead.status}</p>
                <p><strong>Date:</strong> {new Date(lead.enquiryDate).toLocaleDateString()}</p>
                <p><strong>Payment:</strong> {lead.paymentStatus}</p>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No awarded or closed leads found.</p>
          )}
        </div>
      </div>
    </>
  );
}