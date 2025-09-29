import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import RouteList from "./RouteList";
import NavBar from "./NavBar";
import "./App.css";

/**
 * App - Main application component
 * 
 * State:
 * - dogs: {data: array, isLoading: boolean}
 * 
 * Props: none
 * 
 * App -> RouteList, NavBar
 */

function App() {
  const [dogs, setDogs] = useState({
    data: null,
    isLoading: true
  });

  useEffect(() => {
    async function loadDogs() {
      try {
        const response = await axios.get("http://localhost:5001/dogs");
        setDogs({
          data: response.data,
          isLoading: false
        });
      } catch (error) {
        console.error("Error loading dogs:", error);
        setDogs({
          data: [],
          isLoading: false
        });
      }
    }
    loadDogs();
  }, []);

  if (dogs.isLoading) {
    return (
      <div className="loading-container">
        <h1>🐕 Loading our furry friends...</h1>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <h1>🐾 Dog Finder App 🐾</h1>
          <p>Discover amazing dogs and learn about their personalities!</p>
        </div>
        <NavBar dogs={dogs.data} />
        <div className="container">
          <RouteList dogs={dogs.data} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
