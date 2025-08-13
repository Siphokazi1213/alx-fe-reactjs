// src/UserDetails.jsx
import React, { createContext, useContext } from 'react';

// UserContext is defined here to resolve the import error.
const UserContext = createContext(null);

function UserDetails() {
  // Use the useContext hook to consume the data provided by the context.
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

export default UserDetails;