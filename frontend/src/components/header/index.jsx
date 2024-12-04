import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-20 h-16 bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg flex items-center justify-between px-8">
      {/* Logo or Title */}
      <div
        className="text-white text-xl font-semibold cursor-pointer"
        onClick={() => navigate('/home')}
      >
        <span className="text-lg">TaskHub</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Home Button */}
        <button
          onClick={() => navigate('/home')}
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-100 transition-all duration-300"
        >
          Home
        </button>

        {/* Sign Out Button */}
        {userLoggedIn && (
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate('/login');
              });
            }}
            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-100 transition-all duration-300"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
