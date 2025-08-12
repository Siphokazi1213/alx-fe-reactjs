// src/components/MainContent.jsx
import React from 'react';

const MainContent = () => {
  return (
    <main style={{
      backgroundColor: '#e9eff4', // Light blue-gray background
      padding: '30px',
      margin: '0 20px 20px 20px', // Margin on sides and bottom
      borderRadius: '8px',
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Inner shadow
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h2 style={{
        fontSize: '2em',
        color: '#333',
        marginBottom: '15px'
      }}>Welcome to the Profile Showcase!</h2>
      <p style={{
        fontSize: '1.1em',
        color: '#666',
        lineHeight: '1.6'
      }}>
        This application demonstrates the use of React components and inline CSS styling.
        Each section of this page is a separate component, styled individually.
        Explore the code to see how different styles are applied directly within the JSX.
      </p>
    </main>
  );
};

export default MainContent;
