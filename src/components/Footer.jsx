import React from 'react';

const Footer = () => {
  const footerStyle = {
    // position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    padding: '10px',
    zIndex: 1000
  };

  return (
    <footer style={footerStyle}>
      <p style={{ 
        margin: 0, 
        fontSize: '0.875rem', 
        fontWeight: 'bold' 
      }}>
        &copy; {new Date().getFullYear()} ProductivityPro
      </p>
      <p>
        Designed and Developed by: 
        <a 
          href="https://linkedin.com/in/adeshkodekalmath"
          className="text-blue-600 hover:underline no-underline"
          style={{ textDecoration: 'none' }}
        >
          Adappayyaswami Kodekalmath
        </a>
      </p>
    </footer>
  );
};

export default Footer;