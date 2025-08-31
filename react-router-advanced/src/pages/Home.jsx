import { Link } from 'react-router-dom';

const Home = () => (
  <div className="text-center p-8 bg-white shadow-md rounded-lg">
    <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
    <p className="text-gray-600 mb-4">This is the landing page of our application.</p>
    <Link to="/about" className="text-blue-500 hover:underline">
      Learn more about us
    </Link>
  </div>
);

export default Home;


