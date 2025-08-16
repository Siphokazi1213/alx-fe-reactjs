// All components and routing are defined within this single file
// to create a complete and self-contained application,
// which prevents file-not-found errors.

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// --- Navbar Component ---
// This component provides navigation links to each page.
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

// --- Home Component ---
// Represents the home page of the website.
const Home = () => {
  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Welcome to Our Company</h1>
      <p className="text-lg text-center text-gray-600">We are dedicated to delivering excellence in all our services.</p>
    </div>
  );
};

// --- About Component ---
// Provides information about the company.
const About = () => {
  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">About Us</h1>
      <p className="text-lg text-gray-700">
        Our company has been providing top-notch services since 1990. We specialize in various fields including technology, marketing, and consultancy. Our mission is to help our clients succeed by providing innovative and effective solutions tailored to their unique needs.
      </p>
    </div>
  );
};

// --- Services Component ---
// Displays a list of services offered by the company.
const Services = () => {
  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Our Services</h1>
      <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
        <li>Technology Consulting</li>
        <li>Market Analysis</li>
        <li>Product Development</li>
        <li>Digital Marketing</li>
      </ul>
    </div>
  );
};

// --- Contact Component ---
// Features a simple form with state management.
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' }); // Clear the form
  };

  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg max-w-2xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Contact Us</h1>
      {isSubmitted ? (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <p className="font-bold text-center">Thank you for your message! We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

// --- Footer Component ---
// An optional footer component that appears on all pages.
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
};

// --- App Component ---
// The main component that sets up the routing and structure.
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;