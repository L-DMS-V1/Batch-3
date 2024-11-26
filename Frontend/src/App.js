import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css'; // Ensure the CSS file name matches
import Navbar from './components/Common/Navbar'; // Adjust path if needed
import Login from './components/auth/Login'; // Adjust path if needed
import Signup from './components/auth/Signup'; // Adjust path if needed
import AdminDashboard from './components/Admin/Dashboard'; // Adjust path if needed
import EmployeeDashboard from './components/Employee/Dashboard'; // Adjust path if needed
import ManagerDashboard from './components/Manager/Dashboard'; // Adjust path if needed
import PrivateRoute from './components/Common/PrivateRoute'; // Ensure the file name matches

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar /> {/* Include the Navbar */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                    <Route path="/employee/dashboard" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
                    <Route path="/manager/dashboard" element={<PrivateRoute><ManagerDashboard /></PrivateRoute>} />
                    <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;