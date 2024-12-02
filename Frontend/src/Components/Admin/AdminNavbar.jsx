import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/signin'); // Redirect to login page after logout
  };

  return (
    <div className="d-flex flex-column vh-100 ">
      {/* Top Navbar */}
      <header className="navbar navbar-dark bg-dark text-white p-3" style={{ width: '100%' }}>
  <div className="container-fluid d-flex flex-column align-items-center">
    {/* Brand name */}
    <h1 className="navbar-brand mb-0">LearnHub</h1>
    
    {/* User info */}
    <div className="d-flex align-items-center mt-2">
      <FaUserCircle size={30} className="text-white me-2" />
      <span>Hey Admin!</span>
    </div>
  </div>
</header>


      {/* Sidebar and Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <nav className="bg-dark text-white p-3" style={{ width: '250px' }}>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <button
                className="btn btn-secondary w-100"
                onClick={() => handleNavigation('/admin')}
              >
                Home
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="btn btn-primary w-100"
                onClick={() => handleNavigation('/courselist')}
              >
                Course List
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="btn btn-primary w-100"
                onClick={() => handleNavigation('/employeeprogress')}
              >
                Employee Progress
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="btn btn-warning w-100"
                onClick={() => handleNavigation('/feedbacks')}
              >
                Feedbacks
              </button>
            </li>
          </ul>
          <div className="mt-auto">
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

       
      </div>
    </div>
  );
};

export default AdminNavbar;
