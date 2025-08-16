import React from 'react';

const UserProfile = ({ userData, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center text-blue-400 text-lg">
        Loading user data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 text-lg">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 text-lg">
        Search results.
      </div>
    );
  }
  
  return (
    <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
      <h3 className="text-3xl font-bold text-gray-100 mb-2">{userData.login}</h3>
      <p className="text-lg text-gray-400 mb-4">
        {userData.name && <span className="font-semibold text-gray-300">{userData.name}</span>}
        {userData.bio && <span className="block mt-2">{userData.bio}</span>}
      </p>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={userData.avatar_url}
          alt={`${userData.login}'s avatar`}
          className="w-24 h-24 rounded-full border-4 border-gray-500"
        />
        <div className="text-gray-300">
          <p>Followers: <span className="font-bold text-white">{userData.followers}</span></p>
          <p>Following: <span className="font-bold text-white">{userData.following}</span></p>
          <p>Public Repos: <span className="font-bold text-white">{userData.public_repos}</span></p>
        </div>
      </div>
      <a
        href={userData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        View Profile on GitHub
      </a>
    </div>
  );
};

export default UserProfile;