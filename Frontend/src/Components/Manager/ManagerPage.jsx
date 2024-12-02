import React, { useState, useEffect } from 'react';
// import img from '../assets/image4.jpg';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '../Api';
import { FaUserCircle } from 'react-icons/fa';

import Managerrequest from './Managerrequest'; // Import the Managerrequest component

function LearningHub() {
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigator = useNavigate();

  const managerUsername = localStorage.getItem('managerUsername') || 'Manager';

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const mockRequests = await getRequests();
        setRequests(mockRequests);
        setTotalRequests(mockRequests.length);
        setCompletedRequests(mockRequests.filter(r => r.status === 'COMPLETED').length);
        setPendingRequests(mockRequests.filter(r => r.status === 'PENDING').length);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleNewRequest = () => {
    setShowModal(true); // Show modal on clicking "Create New Request"
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigator('/signin');
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const closeCard = () => {
    setSelectedRequest(null);
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="bg-light min-vh-100 position-relative">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4 bg-dark p-4 shadow-sm">
        <h1 className="text-3xl font-semibold text-warning">LearnHub</h1>
        <div className="d-flex align-items-center space-x-4">
          <FaUserCircle size={30} className="text-white" />
          <span className="text-lg text-white p-3">Hey {managerUsername}!</span>
          <button 
            onClick={handleLogout}
            className="btn btn-danger text-white d-flex align-items-center"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Request Stats */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">Total Requests</h3>
              <p className="card-text fs-3">{totalRequests}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">Completed Requests</h3>
              <p className="card-text fs-3">{completedRequests}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">Pending Requests</h3>
              <p className="card-text fs-3">{pendingRequests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Request Button */}
      <div className='d-flex justify-content-center mb-4'>
        <button
          className="btn btn-primary mb-4"
          onClick={handleNewRequest}
        >
          Create New Request
        </button>
      </div>

      {/* Requests Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr className="table-secondary">
              <th className="p-2">Training Program</th>
              <th className="p-2">Request Id</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="hover-bg-light">
                <td className="p-2">{request.courseName}</td>
                <td className="p-2">{request.requestId}</td>
                <td className="p-2">{request.status}</td>
                <td className="p-2">
                  <button
                    className="btn btn-info"
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

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="card w-75 w-md-50 p-4">
            <button
              className="btn-close text-dark position-absolute top-0 end-0 m-3"
              onClick={closeCard}
            ></button>
            <h2 className="mb-4">Request Details</h2>
            <p><strong>Course Name:</strong> {selectedRequest.courseName}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Concepts:</strong> {selectedRequest.concepts}</p>
            <p><strong>Duration:</strong> {selectedRequest.duration}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
          </div>
        </div>
      )}

      {/* Modal for Create Request */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="card w-50 w-md-50 p-4">
            <button
              className="btn-close text-dark position-absolute top-0 end-0 m-3 "
              onClick={closeModal}
            ></button>

            <div className="modal-body align-items-center justify-content-center" style={{ maxHeight: '400px',maxWidth:'400px', overflowY: 'auto' }}>
                <Managerrequest /> {/* Add your modal content here */}
              </div> {/* Render the Managerrequest component inside the modal */}
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningHub;
