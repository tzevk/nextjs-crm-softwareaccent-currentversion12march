// WidgetCard.jsx
import React from "react";
import styles from "../styles/dashboard.module.css";

const WidgetCard = ({ widget, index, onDelete }) => {
  return (
    <div className={styles.card}>
      <span>{widget}</span>
      <button
        onClick={() => onDelete(index)}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </div>
  );
};

export default WidgetCard;