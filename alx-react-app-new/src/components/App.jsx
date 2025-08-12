// App.jsx
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

const UserProfile = (props) => {
  return (
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
      <h2 style={{
        color: '#0056b3', // A shade of blue
        fontSize: '2.8em', // Larger font size for name
        marginBottom: '12px', // Margin below name
        fontFamily: 'Inter, sans-serif',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)' // Subtle text shadow
      }}>{props.name}</h2>
      <p style={{
        fontSize: '1.3em', // Slightly larger font for age
        color: '#333', // Dark gray for age
        marginBottom: '10px', // Margin below age
        fontFamily: 'Inter, sans-serif'
      }}>
        Age: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{props.age}</span>
      </p>
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

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #e0f7fa, #e8eaf6)', // Light gradient background
      display: 'flex',
      flexDirection: 'column', // Arrange children vertically
      fontFamily: 'Inter, sans-serif', // Global font family
      padding: '20px' // Overall padding for the app container
    }}>
      <Header />
      <UserProfile
        name="Alice Wonderland"
        age="25"
        bio="Loves exploring new places, reading fantasy novels, and capturing moments through photography. Always ready for a new adventure!"
      />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;