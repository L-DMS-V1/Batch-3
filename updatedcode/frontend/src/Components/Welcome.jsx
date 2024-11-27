import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Welcome = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            LearnHub
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Login
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div
        className="container-fluid text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: 'url("https://www.shutterstock.com/image-photo/assortment-colored-school-supplies-on-260nw-1902620623.jpg")', // Corrected path for the background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          color: 'white',
        }}
      >
        {/* Animated Heading */}
        <h1 className="mb-4 display-3 text-primary animate__animated animate__fadeIn animate__delay-1s">
          Welcome to the Learning & Development Hub
        </h1>

        {/* About Section */}
        <p className="lead text-white animate__animated animate__fadeIn animate__delay-2s">
          Empowering employees through continuous learning, skill development, and progress tracking.
          Our Learning & Development Management System helps manage, monitor, and track courses and progress, 
          all in one place!
        </p>

        {/* Call to Action Buttons
        <div className="d-flex flex-column align-items-center gap-3">
          <Link to="/signin" className="w-100">
            <button className="btn btn-primary w-100" style={{ maxWidth: '300px' }}>
              Login
            </button>
          </Link>
          <Link to="/signup" className="w-100">
            <button className="btn btn-success w-100" style={{ maxWidth: '300px' }}>
              Sign Up
            </button>
          </Link>
        </div> */}

        {/* Footer Section */}
        <div className="mt-5">
          <p className="text-primary" style={{ color: 'rgba(255, 250, 255, 0.8)' }}>
            Ready to enhance your skills? Join us today and take your learning journey to the next level!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
