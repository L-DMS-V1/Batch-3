import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the authentication context
const AuthContext = createContext();

// AuthProvider component to provide the authentication context to children
const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Function to set the authentication token and user data
  const saveAuthData = (newToken, userData) => {
    setToken(newToken);
    setUser (userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  // Function to clear the authentication token and user data
  const clearAuthData = () => {
    setToken(null);
    setUser (null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    return token !== null;
  };

  // Login function to authenticate the user
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { token, user } = response.data;
      saveAuthData(token, user);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  // Logout function to clear authentication data
  const logout = () => {
    clearAuthData();
  };

  // Memoized value of the authentication context
  const contextValue = {
    token,
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;