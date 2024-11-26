import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminDashboard from './components/Admin/Dashboard';
import EmployeeDashboard from './components/Employee/Dashboard';
import ManagerDashboard from './components/Manager/Dashboard';
import PrivateRoute from './components/Common/PrivateRoute';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<PrivateRoute component={AdminDashboard} roles={['admin']} />} />
                <Route path="/employee" element={<PrivateRoute component={EmployeeDashboard} roles={['user']} />} />
                <Route path="/manager" element={<PrivateRoute component={ManagerDashboard} roles={['manager']} />} />
            </Routes>
        </Router>
    );
}

export default App;