import React, { useState } from 'react';
import { loginUser } from './Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
  
      const role = response.role || localStorage.getItem('role'); // Fallback to localStorage
      toast.success('Login successful!');
  

      setTimeout(() => {
        if (role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else if (role === 'ROLE_MANAGER') {
          navigate('/manager');
        } else if (role === 'ROLE_EMPLOYEE') {
          navigate('/employee');
        } else {
          navigate('/'); // Default fallback
        }
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || 'Invalid username or password', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Sign In
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="text-muted">Don't have an account? <Link to="/signup" className="text-primary">Sign Up Now!</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
