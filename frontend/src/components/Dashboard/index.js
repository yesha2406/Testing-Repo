// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import "./styles.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([
    { name: "raj", id: "1", description: "Testin" },
    { name: "yesha", id: "2", description: "asdas" },
  ]);

  useEffect(() => {
    // Fetch projects from your API
    const fetchProjects = async () => {
      try {
        const response = await axios.get("YOUR_API_PROJECTS_ENDPOINT");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      // Delete project using your API
      await axios.delete(`YOUR_API_PROJECT_ENDPOINT/${projectId}`);
      // Update state to remove the deleted project
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  };

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
