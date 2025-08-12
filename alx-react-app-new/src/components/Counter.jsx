// src/components/Counter.jsx
import React, { useState } from 'react';

// The Counter component uses the useState hook to manage its count.
const Counter = () => {
  // 1. Initialize state with a count of 0.
  // `count` is the current state value, and `setCount` is the function to update it.
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-md text-center mt-10">
      {/* 2. Display the current count. */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Simple Counter</h2>
      <p className="text-7xl font-mono font-bold text-blue-600 mb-8">{count}</p>
      
      {/* 3. Create buttons for counter actions with onClick handlers. */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;