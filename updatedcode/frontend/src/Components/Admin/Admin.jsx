import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './AdminNavbar';
import { getAllRequests, getRequestById } from '../Api';

function Admin() {
  const [allrequests, setAllRequests] = useState([]);
  const [totalRequestsCount, setTotalRequestsCount] = useState(0);
  const [respondedRequests, setRespondedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [showPending, setShowPending] = useState(false); // State to toggle pending requests
  const [showCompleted, setShowCompleted] = useState(false); // State to toggle completed requests

  const navigator = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const mockAllRequests = await getAllRequests();
        setAllRequests(mockAllRequests);
        setTotalRequestsCount(mockAllRequests.length);
        setRespondedRequests(mockAllRequests.filter(r => r.status !== 'PENDING'));
        setPendingRequests(mockAllRequests.filter(r => r.status === 'PENDING'));
        setCompletedRequests(mockAllRequests.filter(r => r.status === 'COMPLETED').length);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Button handler
  const handleViewRequest = async (request) => {
    try {
      const requestData = await getRequestById(request.requestId); // Call API handler with requestId
      navigator('/viewRequest', { state: { requestData } }); // Pass data to the route
    } catch (error) {
      console.error("Failed to fetch request details:", error);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="flex-grow-1 container py-4 mt-3">
      <h2 className="text-center display-4 mb-4" style={{ fontWeight: '500' }}>
  LearnHub
</h2>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body text-center">
                <h3 className="card-title">{completedRequests}</h3>
                <p className="card-text">Courses Created</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body text-center">
                <h3 className="card-title">1</h3>
                <p className="card-text">Employees</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-info mb-3">
              <div className="card-body text-center">
                <h3 className="card-title">{totalRequestsCount}</h3>
                <p className="card-text">Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Buttons for Pending and Completed Requests */}
        <div className="mb-4">
          <button
            className="btn btn-primary me-2"
            onClick={() => setShowPending((prev) => !prev)}
          >
            {showPending ? 'Hide Pending Requests' : 'Show Pending Requests'}
          </button>
          <button
            className="btn btn-success"
            onClick={() => setShowCompleted((prev) => !prev)}
          >
            {showCompleted ? 'Hide Completed Requests' : 'Show Completed Requests'}
          </button>
        </div>

        {/* Pending Requests Section */}
        {showPending && (
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header">
                  <h5 className="card-title">Pending Requests</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Manager Name</th>
                        <th scope="col">Training Program</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((request, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td> {/* Serial Number */}
                          <td>{request.managerUsername}</td>
                          <td>{request.courseName}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleViewRequest(request)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Requests Section */}
        {showCompleted && (
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header">
                  <h5 className="card-title">Completed Requests</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Manager Name</th>
                        <th scope="col">Training Program</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {respondedRequests.map((request, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td> {/* Serial Number */}
                          <td>{request.managerUsername}</td>
                          <td>{request.courseName}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleViewRequest(request)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
