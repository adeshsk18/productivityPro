import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ProductivityPro</Link>
      </div>
      
      <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/tasks" onClick={toggleMenu}>Task Manager</Link>
        <Link to="/projects" onClick={toggleMenu}>Project Manager</Link>
        <Link to="/notes" onClick={toggleMenu}>Note Taker</Link>
        <Link to="/login" onClick={toggleMenu}>Login</Link>
        <Link to="/register" onClick={toggleMenu}>Register</Link>
      </div>
    </nav>
  );
};

export default NavBar;