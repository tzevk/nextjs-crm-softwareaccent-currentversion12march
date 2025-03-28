import React, { useState, useEffect } from "react";
import styles from "../styles/dashboard.module.css";

const AdminTodoWidget = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.widgetCard2}>
      <h3 className={styles.widgetTitle}>User Submitted To-Do List</h3>
      <ul className={styles.taskList}>
        {tasks.length === 0 ? (
          <p className={styles.noTasks}>No tasks submitted yet.</p>
        ) : (
          tasks.map((task) => (
            <li key={task._id} className={styles.taskItem}>
              {task.text} {task.completed && <span className={styles.completed}>✓</span>}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminTodoWidget;