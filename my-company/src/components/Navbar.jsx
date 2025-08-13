// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyCompany</Link>
        </div>
        <div className="space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">About</Link>
          <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">Services</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;