import { NavLink } from "react-router-dom";
import "./NavBar.css";

/**
 * NavBar - Navigation component with links to all dogs
 * 
 * Props:
 * - dogs: array of dog objects
 * 
 * Renders navigation links for each dog and home
 */

function NavBar({ dogs }) {
  const links = dogs.map(dog => (
    <NavLink 
      key={dog.name} 
      to={`/dogs/${dog.name.toLowerCase()}`}
      className="nav-link"
    >
      {dog.name}
    </NavLink>
  ));

  return (
    <nav className="navbar">
      <NavLink to="/dogs" end className="nav-link home-link">
        🏠 Home
      </NavLink>
      {links}
    </nav>
  );
}

export default NavBar;
