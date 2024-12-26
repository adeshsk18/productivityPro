import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';
import GoogleButton from './GoogleButton';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <motion.div 
        className="register-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="register-title">Create Account</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-input"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-input"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </motion.button>
        </form>
        <div className="divider">OR</div>
        
        <GoogleButton />
      </motion.div>
    </div>
  );
}