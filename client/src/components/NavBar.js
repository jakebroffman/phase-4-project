import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

function NavBar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/sneakers" className="nav-link">Sneakers</Link>
      {isLoggedIn && (
        <>
          <Link to="/userprofile" className="nav-link">Edit Profile</Link>
          <Link to="/myreviews" className="nav-link">My Reviews</Link>
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/signin" className="nav-link">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
