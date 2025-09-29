import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./DogDetails.css";

/**
 * DogDetails - Displays detailed information about a specific dog
 * 
 * Props:
 * - dog: dog object with name, src, age, facts
 * 
 * Rendered by FilterDogDetails
 */

function DogDetails({ dog }) {
  if (!dog) return <Navigate to="/dogs" replace />;

  return (
    <div className="row DogDetails">
      <div className="col d-flex flex-column align-items-center">
        <div className="dog-details-card">
          <img 
            src={`/${dog.src}.jpg`} 
            alt={dog.name}
            className="dog-detail-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=' + dog.name;
            }}
          />
          <div className="dog-info">
            <h2 className="dog-title">{dog.name}</h2>
            <h3 className="dog-age">Age: {dog.age} years old</h3>
            <div className="facts-section">
              <h4>Fun Facts About {dog.name}:</h4>
              <ul className="facts-list">
                {dog.facts.map((fact, i) => (
                  <li key={i} className="fact-item">
                    <span className="fact-icon">🐾</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/dogs" className="back-button">
              ← Back to All Dogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogDetails;
