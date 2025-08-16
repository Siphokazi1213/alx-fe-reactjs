// This component handles the search functionality and displays results.
import React, { useState } from 'react';
import { searchUsers } from '../services/githubService.js';

const Search = () => {
  // State for search input, user data, loading status, and error messages.
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Handles the form submission for a new search.
  const handleSearch = async (event, page = 1) => {
    if (event) {
      event.preventDefault();
    }
    
    // Reset states for a new search.
    if (page === 1) {
      setUsers([]);
      setError(null);
      setHasMore(true);
    }
    setLoading(true);

    try {
      const data = await searchUsers(username, location, minRepos, page);
      setUsers((prevUsers) => [...prevUsers, ...data.items]); // Append new users to the list.
      setCurrentPage(page);
      
      // Check if there are more results to load.
      if (data.items.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      setError("An error occurred during the search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch(null, currentPage + 1);
  };

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gray-800 border border-gray-700 w-full max-w-2xl">
      <form onSubmit={(e) => handleSearch(e)} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username or keyword..."
          className="flex-grow p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g., 'Lagos')"
            className="flex-grow p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="Min Repos (e.g., '10')"
            className="flex-grow p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-700 p-4 rounded-xl border border-gray-600 flex items-center space-x-4">
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-16 h-16 rounded-full border-2 border-gray-500 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-100">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;