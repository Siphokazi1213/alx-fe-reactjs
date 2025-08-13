// src/ProfilePage.jsx
import React, { useContext } from 'react';
import UserContext from './UserContext';

// This is the UserDetails component, now defined within this file.
// It consumes the UserContext directly.
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

// This is the UserInfo component, now defined within this file.
// It no longer accepts the `userData` prop.
function UserInfo() {
  return (
    <div className="border-t border-gray-200 mt-6 pt-6">
      <UserDetails />
    </div>
  );
}

// The main ProfilePage component.
function ProfilePage() {
  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-lg w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
      <UserInfo />
    </div>
  );
}

export default ProfilePage;