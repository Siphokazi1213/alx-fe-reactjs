// src/components/UserProfile.jsx
import React from 'react';

// Define the UserProfile functional component that takes props
const UserProfile = (props) => {
  return (
    // Apply inline styling to the main div (card container)
    <div style={{
      border: '1px solid #ddd', // Lighter border
      padding: '25px', // Increased padding
      margin: '20px auto', // Center the card with auto margins
      borderRadius: '12px', // More rounded corners
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // More prominent shadow
      backgroundColor: '#ffffff', // White background
      maxWidth: '450px', // Slightly wider card
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'transform 0.3s ease-in-out', // Smooth hover effect
    }}>
      {/* Display the user's name with inline styling */}
      <h2 style={{
        color: '#0056b3', // A shade of blue
        fontSize: '2.8em', // Larger font size for name
        marginBottom: '12px', // Margin below name
        fontFamily: 'Inter, sans-serif',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)' // Subtle text shadow
      }}>{props.name}</h2>

      {/* Display the user's age with inline styling */}
      <p style={{
        fontSize: '1.3em', // Slightly larger font for age
        color: '#333', // Dark gray for age
        marginBottom: '10px', // Margin below age
        fontFamily: 'Inter, sans-serif'
      }}>
        Age: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{props.age}</span>
      </p>

      {/* Display the user's bio with inline styling */}
      <p style={{
        fontSize: '1.1em', // Standard font size for bio
        color: '#555', // Medium gray for bio
        lineHeight: '1.6', // Improved line spacing
        fontFamily: 'Inter, sans-serif',
        maxWidth: '90%' // Limit bio width for readability
      }}>
        Bio: {props.bio}
      </p>
    </div>
  );
};

export default UserProfile;