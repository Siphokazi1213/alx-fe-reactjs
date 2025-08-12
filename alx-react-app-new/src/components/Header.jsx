// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#282c34', // Dark background
      color: 'white',
      textAlign: 'center',
      padding: '20px 0', // Padding top and bottom
      marginBottom: '20px', // Margin below header
      borderRadius: '8px', // Rounded corners
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Subtle shadow
    }}>
      <h1 style={{
        fontSize: '2.8em', // Larger font size
        margin: '0', // Remove default margin
        fontFamily: 'Inter, sans-serif' // Ensure Inter font
      }}>My Profile Showcase</h1>
    </header>
  );
};

export default Header;
