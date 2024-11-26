import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/admin">Admin Dashboard</Link>
            <Link to="/employee">Employee Dashboard</Link>
            <Link to="/manager">Manager Dashboard</Link>
        </nav>
    );
};

export default Navbar;