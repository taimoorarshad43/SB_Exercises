import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import DogList from './DogList';
import FilterDogDetails from './FilterDogDetails';

/**
 * RouteList - Handles all routing for the application
 * 
 * Props:
 * - dogs: array of dog objects
 * 
 * Routes:
 * - /dogs: Shows list of all dogs
 * - /dogs/:name: Shows details for specific dog
 * - /*: Redirects to /dogs
 */

function RouteList({ dogs }) {
  return (
    <Routes>
      <Route
        path="/dogs"
        element={<DogList dogs={dogs} />}
      />

      <Route
        path="/dogs/:name"
        element={<FilterDogDetails dogs={dogs} />}
      />

      <Route
        path="/*"
        element={<Navigate to="/dogs" replace />}
      />
    </Routes>
  );
}

export default RouteList;
