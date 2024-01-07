import React from "react";
import { Link } from "react-router-dom";

const CreateProjectPrompt = () => {
  return (
    <>
      <div className="dashboard-project-container">
        <div className="dashboard-project-wrapper">
          <h1 className="dashboard-project-title">Créer un projet</h1>
          <p className="dashboard-project-description">
            Veuillez créer un projet avant de continuer.
          </p>
          <Link to="project">
            <button className="dashboard-project-button">
              Créer un projet
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default CreateProjectPrompt;
