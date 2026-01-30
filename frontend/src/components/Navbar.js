import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  return (
    <nav className="navbar">
      <h1>Smart Skill Tracker</h1>
      <ul className="nav-links">
        {!user ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/assessment">Assessment</Link></li>
            <li><Link to="/progress">Progress</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;