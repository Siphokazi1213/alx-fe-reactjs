import React from 'react';
import Search from './components/Search.jsx'; // Import the new Search component

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 font-sans">
      <header className="text-center mb-10 mt-10">
        <h1 className="text-5xl font-extrabold text-blue-400 mb-2">GitHub User Search</h1>
        <p className="text-xl text-gray-400">Find and explore GitHub profiles with ease.</p>
      </header>

      {/* Render the core Search component */}
      <Search />
      
    </div>
  );
}

export default App;