import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



const PrivateRoute = ({ component: Component, roles }) => {
    const { auth } = useAuth();

    return (
        auth && roles.includes(auth.role) ? <Component /> : <Navigate to="/login" />
    );
};

export default PrivateRoute;