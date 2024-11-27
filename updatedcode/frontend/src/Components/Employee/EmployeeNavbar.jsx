import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // logout();  // Call the logout function to clear localStorage
    navigate('/signin');  // Redirect to login page after logout
  };

  return (
    <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
      <h1 className="text-warning mb-0">LearnHub</h1>
      <div className="d-flex align-items-center">
      <FaUserCircle size={30} className="text-white" />
        <span className="me-4">Hey Employee!</span>
        
        {/* Logout Button */}
        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
