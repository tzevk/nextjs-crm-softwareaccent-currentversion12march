import React from "react";
import WidgetCard from "./WidgetCard";
import styles from "../styles/dashboard.module.css"; // Use your existing styling

const ProjectsWidget = () => {
  const projects = [
    { id: 1, project_name: "CRM Integration for XYZ Corp", status: "PO Pending" },
    { id: 2, project_name: "E-commerce Platform Revamp", status: "PO Pending" },
    { id: 3, project_name: "AI Chatbot Development", status: "PO Pending" },
    { id: 4, project_name: "Cloud Migration for Tech Solutions", status: "PO Pending" },
    { id: 5, project_name: "Custom ERP Implementation", status: "PO Pending" },
  ];

  const handleViewDetails = () => {
    // Navigate to projects details or open a modal
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
        {projects.map((project) => (
          <li key={project.id} className={styles.projectItem}>
            <strong>{project.project_name}</strong> - <span>{project.status}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
};

export default ProjectsWidget;