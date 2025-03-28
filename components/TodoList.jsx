import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // ✅ Move this outside useEffect so it's reusable
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      console.log("Fetched tasks:", data);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchTasks(); // still called on mount
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask }),
      });
      setNewTask("");
      fetchTasks(); // ✅ now this works, because it's in scope
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editedText }),
    });
    setEditingTaskId(null);
    setEditedText("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleCompleted = async (id, current) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !current }),
    });
    fetchTasks();
  };

  return (
    <div className={styles.widgetCard2}>
      <h3 className={styles.widgetTitle}>Your To-Do List</h3>

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={addTask} style={{ marginLeft: "0.5rem" }}>
          Add
        </button>
      </div>
      <ul className={styles.taskList}>
  {Array.isArray(tasks) && tasks.length > 0 ? (
    tasks.map((task) => (
      <li key={task._id}>...</li>
    ))
  ) : (
    <p className={styles.noTasks}>No tasks found.</p>
  )}
</ul>

    </div>
  );
};

export default TodoList;