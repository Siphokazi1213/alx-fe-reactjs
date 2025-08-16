import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import { getUser } from './services/github';

function App() {
  // State for the search term, user data, loading status, and error messages
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the form submission to search for a GitHub user.
   * @param {object} event The form submission event.
   */
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    // Clear previous results and states
    setUserData(null);
    setError(null);
    setLoading(true);

    try {
      // Fetch user data from the GitHub API using the service function
      const user = await getUser(searchTerm);
      setUserData(user);
    } catch (err) {
      // Set an error message if the user is not found or another issue occurs
      if (err.response && err.response.status === 404) {
        setError(`User "${searchTerm}" not found. Please check the spelling.`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // End loading regardless of success or failure
    }
  };

  return (
    // The main container for the application.
    // Using Tailwind CSS classes for styling.
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 font-sans">
      <header className="text-center mb-10 mt-10">
        <h1 className="text-5xl font-extrabold text-blue-400 mb-2">GitHub User Search</h1>
        <p className="text-xl text-gray-400">Find and explore GitHub profiles with ease.</p>
      </header>

      {/* Main content container for the search form and results */}
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-gray-200 mb-4">Search for a User</h2>
        
        {/* Render the refactored components */}
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        <UserProfile 
          userData={userData}
          loading={loading}
          error={error}
        />
      </div>
      
    </div>
  );
}

export default App;