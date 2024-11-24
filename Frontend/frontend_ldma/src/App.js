import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Module1/Home';
import Login from './components/Module1/Login';
import Signup from './components/Module1/Signup';
import ManagerDashboard from './components/Module2/ManagerDashboard';
import TrainingRequestForm from './components/Module2/TrainingRequestForm';
import Navbar from './components/Module3/Navbar';
import Sidebar from './components/Module3/Sidebar';
import Header from './components/Module3/Header';
import EmployeeList from './components/Module3/EmployeeList';
import AssignCourseModal from './components/Module3/AssignCourseModal';
import AddEmployeeModal from './components/Module3/AddEmployeeModal';
import ViewTrainingForm from './components/Module3/ViewTrainingForm';

const App = () => {
  const [role, setRole] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [trainingRequests, setTrainingRequests] = React.useState([]);

  const handleRole = (role) => {
    setRole(role);
    setIsLoggedIn(true);
  };

  const handleRequestAction = async (index, action) => {
    const request = trainingRequests[index];
    try {
      const response = await fetch(`http://localhost:8081/api/training-requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action }),
      });
      if (response.ok) {
        const updatedRequest = await response.json();
        setTrainingRequests(trainingRequests.map((req, i) => (i === index ? updatedRequest : req)));
      }
    } catch (error) {
      console.error(`Error updating training request to ${action}:`, error);
    }
  };

  useEffect(() => {
    // Fetch employees data from API or generate it
    const employeesData = [
      { id: 1, name: 'John Doe', course: 'React', age: 30, trainer: 'Jane Doe', joinedDate: '2022-01-01', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', course: 'Angular', age: 25, trainer: 'Bob Smith', joinedDate: '2022-02-01', email: 'jane.doe@example.com' },
    ];
    setEmployees(employeesData);

    // Fetch training requests data from API or generate it
    const trainingRequestsData = [
      { id: 1, employeeId: 1, firstName: 'John Doe', courseRequested: 'React', jobDescription: 'Software Developer' },
      { id: 2, employeeId: 2, firstName: 'Jane Doe', courseRequested: 'Angular', jobDescription: 'Software Developer' },
    ];
    setTrainingRequests(trainingRequestsData);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleRole={handleRole} />} />
        <Route path="/signup" element={<Signup handleRole={handleRole} />} />

        <Route
          path="/manager-dashboard"
          element={isLoggedIn && role === 'Manager' ? <ManagerDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/training-request"
          element={isLoggedIn && role === 'Manager' ? <TrainingRequestForm /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/admin"
          element={
            isLoggedIn && role === 'Admin' ? (
              <div className="admin-page-container">
                <div className="admin-page-content">
                  <div className="admin-page-component">
                    <Navbar />
                  </div>
                  <div className="admin-page-component">
                    <Sidebar />
                  </div>
                  <div className="admin-page-component">
                    <Header />
                  </div>
                  <div className="admin-page-component">
                    <EmployeeList employees={employees} />
                  </div>
                  <div className="admin-page-component">
                    <AssignCourseModal />
                  </div>
                  <div className="admin-page-component">
                    <AddEmployeeModal />
                  </div>
                  <div className="admin-page-component">
                    <h1>Training Requests</h1>
                    <table>
                      <thead>
                        <tr>
                          <th>Employee Name</th>
                          <th>Course Requested</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trainingRequests.map((request, index) => (
                          <tr key={index}>
                            <td>{request.firstName}</td>
                            <td>{request.courseRequested}</td>
                            <td>
                              {request.status ? (
                                <span>{request.status}</span>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      handleRequestAction(index, 'Accepted')
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleRequestAction(index, 'Rejected')
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;