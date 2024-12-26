import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
      {currentUser ? (
          <>
            <Link to="/tasks" className="nav-link">Task manager</Link>
            <Link to="/notes" className="nav-link">Note Taker</Link>
            <Link to="/projects" className="nav-link">Project Manager</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
        {auth.currentUser && (
        <button 
          className="logout-button" 
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
      </div>
    </nav>
  );
};

export default NavBar;