// App.jsx
import React from "react";

// UserProfile.jsx
// Define the UserProfile functional component that takes props
const UserProfile = (props) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 m-4 max-w-sm mx-auto flex flex-col items-center justify-center text-center">
      {/* Display the user's name */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
        {props.name}
      </h2>
      {/* Display the user's age */}
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Age:</span> {props.age}
      </p>
      {/* Display the user's bio */}
      <p className="text-base text-gray-600 leading-relaxed">
        <span className="font-semibold">Bio:</span> {props.bio}
      </p>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 font-sans">
      {/* Use the UserProfile component with example props */}
      <UserProfile
        name="Grace Mo"
        age="25"
        bio="Loves exploring new places, reading fantasy novels, and capturing moments through photography. Always ready for a new adventure!"
      />
      {/* You can add more UserProfile cards here if needed */}
      {/*
      <UserProfile
        name="Michael Smith"
        age="30"
        bio="Passionate about building innovative software solutions and enjoys spending weekends hiking in the mountains."
      />
      */}
    </div>
  );
};

export default App;
