import React, { useState } from 'react';
import { signup } from '../../api/auth';
import './styles.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, email, password, role);
            // Redirect to login or dashboard
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User </option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
            </select>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;