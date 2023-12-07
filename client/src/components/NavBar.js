// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/sneakers" className="nav-link">Sneakers</Link>
      <Link to="/signup" className="nav-link">Sign Up</Link> 
      <Link to="/signin" className="nav-link">Sign In</Link> 
    </nav>
  );
}

export default NavBar;
