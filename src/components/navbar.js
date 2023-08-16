
import React from 'react';
import { Link } from 'react-router-dom';
import "./component.css"

function Navbar() {
  return (
    <nav className="horizontal-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Record">Record</Link>
        </li>
        <li>
          <Link to="/Zone">Zone</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;