import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      setAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-500">Use 'user' for username and 'password' for password.</p>
    </div>
  );
};

export default Login;