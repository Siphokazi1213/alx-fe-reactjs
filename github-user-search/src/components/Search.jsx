import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  // State for search input, user data, loading status, and error messages.
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handles the form submission.
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevents the page from reloading.
    
    // Reset states before a new search.
    setUserData(null);
    setError(null);
    setLoading(true);

    try {
      const data = await fetchUserData(username);
      setUserData(data); // Set user data on success.
    } catch (err) {
      setError("Looks like we can't find the user."); // Set error message on failure.
    } finally {
      setLoading(false); // Stop loading regardless of the outcome.
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gray-800 border border-gray-700 w-full max-w-2xl">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a GitHub username..."
          className="flex-grow p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>

      {/* Conditional rendering for loading, error, and results */}
      {loading && (
        <div className="text-center text-blue-400 text-lg py-8">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 text-lg py-8">
          {error}
        </div>
      )}

      {userData && (
        <div className="bg-gray-700 p-6 rounded-xl border border-gray-600 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="w-32 h-32 rounded-full border-4 border-gray-500 shadow-md"
          />
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-100 mb-1">{userData.login}</h3>
            {userData.name && (
              <p className="text-xl text-gray-400 mb-2">{userData.name}</p>
            )}
            {userData.bio && (
              <p className="text-lg text-gray-300 mb-4">{userData.bio}</p>
            )}
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;