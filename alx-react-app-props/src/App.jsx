// src/App.jsx
import React, { createContext, useContext } from 'react';

// Define the user data here at the top level.
const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

// 1. Create a UserContext:
const UserContext = createContext(null);

// 2. Refactored UserDetails.jsx
// This component now consumes UserContext
function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div className="space-y-4">
      <p className="text-gray-700 text-lg">
        <span className="font-semibold text-gray-900">Name:</span> {userData.name}
      </p>
      <p className="text-gray-700 text-lg">
        <span className="font-semibold text-gray-900">Email:</span> {userData.email}
      </p>
    </div>
  );
}

// 3. Refactored UserInfo.jsx
// This component no longer accepts the `userData` prop.
function UserInfo() {
  return (
    <div className="border-t border-gray-200 mt-6 pt-6">
      <UserDetails />
    </div>
  );
}

// 4. Refactored ProfilePage.jsx
// This component no longer accepts the `userData` prop.
function ProfilePage() {
  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-lg w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
      <UserInfo />
    </div>
  );
}

// The main App component
function App() {
  return (
    // 5. Provide Context in App:
    // The UserContext.Provider makes the `userData` object available
    // to any component inside it, regardless of how deep the nesting is.
    <UserContext.Provider value={userData}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ProfilePage />
      </div>
    </UserContext.Provider>
  );
}

export default App;