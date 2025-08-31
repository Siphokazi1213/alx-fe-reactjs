import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import ProfileDetails from './pages/ProfileDetails';
import ProfileSettings from './pages/ProfileSettings';
import Post from './pages/Post';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="container mx-auto p-4 font-sans">
        <nav className="flex justify-center space-x-4 mb-8 p-4 bg-gray-200 rounded-lg shadow-inner">
          <Link to="/" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">Home</Link>
          <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">About</Link>
          <Link to="/profile" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">Profile</Link>
          <Link to="/dashboard" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">Dashboard</Link>
          <Link to="/post/123" className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">Post (Dynamic)</Link>
        </nav>

        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard setAuthenticated={setAuthenticated} />
                </ProtectedRoute>
              }
            />
            {/* Nested Routes */}
            <Route path="/profile" element={<Profile />}>
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
            {/* Redirect a root profile URL to a default nested route */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
