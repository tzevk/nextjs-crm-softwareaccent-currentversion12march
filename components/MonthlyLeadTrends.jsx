import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styles from "../styles/dashboard.module.css";

const MonthlyLeadTrends = () => {
  const sampleData = [
    { month: "Jan", leads: 30 },
    { month: "Feb", leads: 45 },
    { month: "Mar", leads: 50 },
    { month: "Apr", leads: 70 },
    { month: "May", leads: 90 },
    { month: "Jun", leads: 110 },
  ];

  return (
    <div className={styles.widgetCard}>
      <h3 className={styles.widgetTitle}>📈 Monthly Lead Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sampleData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="leads" stroke="#6A0DAD" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyLeadTrends;