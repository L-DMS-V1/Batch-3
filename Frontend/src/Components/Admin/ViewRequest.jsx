import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptRequest, rejectRequest } from '../Api';
import Swal from 'sweetalert2';
import AdminNavbar from './AdminNavbar';
import Admin from './Admin';

const ViewRequest = () => {
  const location = useLocation();
  const { requestData } = location.state || {};

  const navigator = useNavigate();

  const handleAcceptRequest = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to accept this request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await acceptRequest(requestData.requestId);
          Swal.fire('Accepted!', 'The request has been accepted.', 'success');
          navigator('/admin'); // Go back to the previous page or refresh data
        } catch (error) {
          console.error("Failed to accept request:", error);
          Swal.fire('Error', 'Failed to accept the request.', 'error');
        }
      }
    });
  };

  const handleRejectRequest = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await rejectRequest(requestData.requestId);
          Swal.fire('Rejected!', 'The request has been rejected.', 'success');
          navigator('/admin'); // Go back to the previous page or refresh data
        } catch (error) {
          console.error("Failed to reject request:", error);
          Swal.fire('Error', 'Failed to reject the request.', 'error');
        }
      }
    });
  };

  const handleCreateCourse = () => { 
    navigator('/createCourse', { state: { requestData } });
  };

  if (!requestData) {
    return <p>Loading request details...</p>;
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
         <AdminNavbar/>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card p-4">
            <h2 className="card-title mb-4">Request Details</h2>
            <p><strong>Request ID:</strong> {requestData.requestId}</p>
            <p><strong>Course Name:</strong> {requestData.courseName}</p>
            <p><strong>Description:</strong> {requestData.description}</p>
            <p><strong>Concepts:</strong> {requestData.concepts}</p>
            <p><strong>Duration:</strong> {requestData.duration}</p>
            
            <p><strong>Status:</strong> {requestData.status}</p>
            <p><strong>Manager Username:</strong> {requestData.managerUsername}</p>

            <div className="mt-4">
              {requestData.status === 'ACCEPTED' ? (
                <button
                  className="btn btn-primary"
                  onClick={handleCreateCourse}
                >
                  Create Course
                </button>
              ) : requestData.status === 'REJECTED' ? (
                <p className="text-danger font-weight-bold">The Request has been REJECTED.</p>
              ) : requestData.status === 'COMPLETED' ? (
                <p className="text-success font-weight-bold">The Request has been ACCEPTED, and Course is CREATED</p>
              ) : (
                <>
                  <button
                    className="btn btn-success mr-2"
                    onClick={handleAcceptRequest}
                  >
                    Accept Request
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleRejectRequest}
                  >
                    Reject Request
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
