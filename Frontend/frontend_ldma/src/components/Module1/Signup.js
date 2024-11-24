import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ handleRole }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    // Call API to signup
    console.log('Signup button clicked');
    handleRole(role);
    navigate('/login');
  };

  return (
    <>
      <form onSubmit={handleSignup}>
        <h1 style={{ color: '#6a11cb', textAlign: 'center' }}>Sign Up</h1>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
        <div className="show-password">
          <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
          <label>Show Password</label>
        </div>
        <br />
        <label>Confirm Password:</label>
        <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        <br />
        <label>Role:</label>
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>
        <br />
        <div className="button-container">
          <button type="submit">Sign Up</button>
          <button type="button">Reset</button>
        </div>
        <p style={{ textAlign: 'center' }}>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </>
  );
};

export default Signup;