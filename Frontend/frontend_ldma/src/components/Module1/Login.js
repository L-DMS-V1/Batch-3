import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ handleRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Call API to login
    console.log('Login button clicked');
    handleRole(role); 
    if(role === 'Manager'){
      navigate('/manager-dashboard');
    } else if(role === 'Admin'){
      navigate('/admin');
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h1 style={{ color: '#6a11cb', textAlign: 'center' }}>Login</h1>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
        <div className="show-password">
          <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
          <label>Show Password</label>
        </div>
        <br />
        <label>Role:</label>
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
        <br />
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button">Reset</button>
        </div>
        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </>
  );
};

export default Login;