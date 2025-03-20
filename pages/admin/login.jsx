// pages/admin/login.jsx
import React, { useState } from "react";
import styles from "../../styles/adminLogin.module.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/authAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Redirect to admin dashboard after successful login
        window.location.href = "/admin/dashboard";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error logging in");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        {/* Replace '/logo.png' with your actual logo image path */}
        <img src="/accent.png" alt="Logo" className={styles.logo} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Admin Username</label>
            <input
              id="username"
              type="text"
              className={styles.input}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}