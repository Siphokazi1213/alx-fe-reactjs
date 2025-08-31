import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="text-center p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-4">
        This is a protected page. Congratulations, you are logged in!
      </p>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;