import { Link, Outlet } from 'react-router-dom';

const Profile = () => (
  <div className="text-center p-8 bg-white shadow-md rounded-lg">
    <h1 className="text-3xl font-bold mb-4">User Profile</h1>
    <nav className="mb-6">
      <Link to="/profile/details" className="mr-4 text-blue-500 hover:underline">Details</Link>
      <Link to="/profile/settings" className="text-blue-500 hover:underline">Settings</Link>
    </nav>
    <Outlet />
  </div>
);

export default Profile;
