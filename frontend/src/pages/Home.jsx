import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from './authService';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="text-center p-8 bg-gray-100 rounded shadow-lg max-w-md mx-auto">
      {user ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
          {user.createdAt && (
            <p>Account created on: {new Date(user.createdAt).toLocaleDateString()}</p>
          )}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <p>
            <Link to="/login" className="text-blue-500 underline">Login</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Home;