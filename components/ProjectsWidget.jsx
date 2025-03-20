// components/ProjectsWidget.jsx
import React from "react";
import WidgetCard from "./WidgetCard";
import styles from "../styles/dashboard.module.css";

const ProjectsWidget = () => {
  const projects = [
    { id: 1, project_name: "CRM Integration for XYZ Corp", status: "PO Pending" },
    { id: 2, project_name: "E-commerce Platform Revamp", status: "PO Pending" },
    { id: 3, project_name: "AI Chatbot Development", status: "PO Pending" },
    { id: 4, project_name: "Cloud Migration for Tech Solutions", status: "PO Pending" },
    { id: 5, project_name: "Custom ERP Implementation", status: "PO Pending" },
  ];

  const handleViewDetails = () => {
    // Navigate to project details or open a modal
  };

  const handleAddNewProject = () => {
    // Trigger the new project creation flow
  };

  return (
    <WidgetCard
      title="Projects"
      onViewDetails={handleViewDetails}
      onAddNew={handleAddNewProject}
    >
      <ul className={styles.projectList}>
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={`${styles.projectItem} ${
              index % 2 === 0 ? styles.projectItemEven : ""
            }`}
          >
            <span className={styles.projectName}>{project.project_name}</span>
            <span className={styles.projectStatus}>{project.status}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
};

export default ProjectsWidget;