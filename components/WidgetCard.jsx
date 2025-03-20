import React from "react";
import styles from "../styles/widgetCard.module.css"; // create a new CSS file or merge with your existing one

const WidgetCard = ({ title, onViewDetails, onAddNew, children }) => {
  return (
    <div className={styles.widgetCard}>
      <div className={styles.widgetHeader}>
        <h2 className={styles.widgetTitle}>{title}</h2>
        <div className={styles.widgetActions}>

          <button className={styles.addButton} onClick={onAddNew}>
            +
          </button>
        </div>
      </div>
      <div className={styles.widgetContent}>{children}</div>
    </div>
  );
};

export default WidgetCard;