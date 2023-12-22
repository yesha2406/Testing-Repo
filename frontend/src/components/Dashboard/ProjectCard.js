// src/components/ProjectCard.js
import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/task/${project.id}`);
  };
  return (
    <div onClick={handleClick} className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ProjectCard;
