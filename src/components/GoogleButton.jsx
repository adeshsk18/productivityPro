import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './GoogleButton.css';

const GoogleButton = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/tasks');
    } catch (error) {
      console.error('Google Sign In Error:', error);
      alert(error.message);
    }
  };

  return (
    <button className="google-btn" onClick={handleGoogleSignIn}>
      <img 
        src={"assets/google-icon.png"} 
        alt="Google"
        className="google-icon"
      />
      Sign in with Google
    </button>
  );
};

export default GoogleButton;