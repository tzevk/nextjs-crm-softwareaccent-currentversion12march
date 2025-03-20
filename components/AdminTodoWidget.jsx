// components/AdminTodoWidget.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/dashboard.module.css";

const AdminTodoWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to fetch tasks from the API
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

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to add a new task via the API
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask }),
      });
      if (!response.ok) throw new Error("Failed to add task");
      setNewTask("");
      fetchTasks(); // Refresh the task list after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className={styles.widgetCard2}>
      <h3 className={styles.widgetTitle}>To-Do List (Admin)</h3>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addTask}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#64126D",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
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

export default AdminTodoWidget;