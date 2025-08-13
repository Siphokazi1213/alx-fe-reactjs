// src/UserInfo.jsx
import React, { useContext } from 'react';
import UserContext from './UserContext';

// The UserDetails component, now defined directly within this file,
// consumes the UserContext directly.
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

// This is the UserInfo component. It no longer accepts the `userData` prop.
function UserInfo() {
  return (
    <div className="border-t border-gray-200 mt-6 pt-6">
      {/* The UserDetails component is now rendered here */}
      <UserDetails />
    </div>
  );
}

export default UserInfo;