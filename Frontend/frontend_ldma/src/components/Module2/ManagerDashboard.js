import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Call API to get requests
    const requestsData = JSON.parse(localStorage.getItem('requests')) || [];
    setRequests(requestsData);
  }, []);

  const handleCreateRequest = () => {
    navigate('/training-request');
  };

  const handleViewRequest = (id) => {
    // Call API to view request
    console.log(`View request ${id}`);
  };

  return (
    <div className="manager-dashboard-container">
      <nav className="nav-bar">
        <span>Learning Hub</span>
        <span>Hey Manager!</span>
        <i className="fa fa-user" aria-hidden="true"></i>
      </nav>
      <div className="request-summary">
        <h2>Request Summary</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <span>Total Requests:</span> {requests.length}
          </div>
          <div>
            <span>Completed Requests:</span> {requests.filter((request) => request.status === 'Completed').length}
          </div>
          <div>
            <span>Pending Requests:</span> {requests.filter((request) => request.status === 'Pending').length}
          </div>
        </div>
      </div>
      <button className="create-request-button" onClick={handleCreateRequest}>
        CREATE REQUEST
      </button>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Training Program</th>
            <th>Position</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.courseName}</td>
              <td>{request.position}</td>
              <td>{request.status}</td>
              <td>{request.createdDate}</td>
              <td>
                <button className="view-button" onClick={() => handleViewRequest(request.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;