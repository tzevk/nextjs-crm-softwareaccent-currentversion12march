import React from "react";
import styles from "../styles/dashboard.module.css";

const PendingPayment = () => {
  return (
    <div className={styles.widgetCard}>
      <h3 className={styles.widgetTitle}> Pending Payment</h3>
      <div className={styles.paymentBox}>
        <div className={styles.paymentItem}>
          <span className={styles.paymentLabel}>Total:</span>
          <span className={styles.paymentValue}>₹2,00,000</span>
        </div>
        <div className={styles.paymentItem}>
          <span className={styles.paymentLabel}>Clients:</span>
          <span className={styles.paymentValue}>34</span>
        </div>
      </div>
    </div>
  );
};

export default PendingPayment;