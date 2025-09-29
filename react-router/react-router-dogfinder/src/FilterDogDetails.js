import React from 'react';
import { useParams } from 'react-router-dom';
import DogDetails from './DogDetails';

/**
 * FilterDogDetails - Finds a dog by name from URL params and renders DogDetails
 * 
 * Props:
 * - dogs: array of dog objects
 * 
 * Rendered at /dogs/:name
 * Uses useParams to get the dog name from the URL
 */

function FilterDogDetails({ dogs }) {
  const { name } = useParams();

  if (name) {
    const currentDog = dogs.find(
      dog => dog.name.toLowerCase() === name.toLowerCase()
    );
    return <DogDetails dog={currentDog} />;
  }

  return null;
}

export default FilterDogDetails;
