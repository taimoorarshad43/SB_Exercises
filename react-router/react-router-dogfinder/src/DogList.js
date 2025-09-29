import React from "react";
import { Link } from "react-router-dom";
import "./DogList.css";

/**
 * DogList - Displays all dogs in a grid layout
 * 
 * Props:
 * - dogs: array of dog objects with name, src, age, facts
 * 
 * Rendered at /dogs
 */

function DogList({ dogs }) {
  return (
    <div className="DogList">
      <div className="row mt-4">
        <div className="col">
          <h2 className="text-center welcome-message">
            🐕 Meet Our Amazing Dogs! 🐕
          </h2>
          <p className="text-center subtitle">
            Click on any dog to learn more about their personality and quirks!
          </p>
        </div>
      </div>
      <div className="row dog-grid">
        {dogs.map(dog => (
          <div className="col-lg-4 col-md-6 col-sm-12 text-center dog-card" key={dog.name}>
            <div className="dog-card-inner">
              <img 
                src={`/${dog.src}.jpg`} 
                alt={dog.name}
                className="dog-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=' + dog.name;
                }}
              />
              <h3 className="dog-name">
                <Link to={`/dogs/${dog.name.toLowerCase()}`} className="dog-link">
                  {dog.name}
                </Link>
              </h3>
              <p className="dog-age">{dog.age} years old</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DogList;
