// pages/dashboard.jsx
import React from "react";
import { parse } from "cookie"; // Named import for the parse function
import AdminTodoWidget from "../../components/AdminTodoWidget";
import styles from "../../styles/adminDashboard.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <h1>Admin Dashboard</h1>
        <AdminTodoWidget />
      </div>
    </div>
  );
}

// Use getServerSideProps to protect the page
export async function getServerSideProps(context) {
  const { req } = context;

  // Parse cookies from the request header using the named import 'parse'
  const cookies = parse(req.headers.cookie || "");

  // Check if the 'session' cookie is present
  if (!cookies.session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If session cookie exists, allow access
  return {
    props: {},
  };
}