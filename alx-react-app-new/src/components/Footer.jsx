// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#282c34', // Same as header for consistency
      color: 'white',
      textAlign: 'center',
      padding: '15px 0',
      marginTop: '20px', // Margin above footer
      borderRadius: '8px',
      boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.2)', // Shadow above footer
      fontFamily: 'Inter, sans-serif'
    }}>
      <p style={{ margin: '0', fontSize: '0.9em' }}>
        &copy; {new Date().getFullYear()} ALX React App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;