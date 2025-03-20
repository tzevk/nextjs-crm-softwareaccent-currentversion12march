import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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

    fetchTasks();
  }, []);

  return (
    <div className={styles.widgetCard2}>
      <h3 className={styles.widgetTitle}>To-Do List</h3>
      <ul className={styles.taskList}>
        {tasks.length === 0 ? (
          <p className={styles.noTasks}>No tasks available.</p>
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

export default TodoList;