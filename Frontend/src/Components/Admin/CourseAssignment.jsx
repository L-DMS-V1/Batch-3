import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './AdminNavbar';
import { getAllEmployeesAdmin, assignCourse, getAssignedEmployees } from '../Api';
import Swal from 'sweetalert2'; // SweetAlert2 import

const CourseAssignment = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]); // To store employees already assigned to the course
  const [unassignedEmployees, setUnAssignedEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [deadline, setDeadline] = useState("");

  const location = useLocation();
  const { course } = location.state || {};
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/courselist'); // Close the course assignment and go back to the course list
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const mockAllEmployees = await getAllEmployeesAdmin();
        setAllEmployees(mockAllEmployees);
        const mockAssignedEmployees = await getAssignedEmployees(course.courseId); // Replace with your API call
        setAssignedEmployees(mockAssignedEmployees); // Set the assigned employees
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (allEmployees.length > 0) {
      if (assignedEmployees.length === 0) {
        // If no employees are assigned, all employees are unassigned
        setUnAssignedEmployees(allEmployees);
      } else {
        // Filter out assigned employees
        const filteredEmployees = allEmployees.filter(
          (employee) =>
            !assignedEmployees.some(
              (assignedEmp) => assignedEmp.employeeId === employee.employeeId
            )
        );
        setUnAssignedEmployees(filteredEmployees); // Update the list of unassigned employees
      }
    }
  }, [allEmployees, assignedEmployees]);

  const handleEmployeeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedEmployees([...selectedEmployees, value]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((emp) => emp !== value));
    }
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create and send the courseAssignmentDTO for each selected employee
    try {
      const courseAssignments = selectedEmployees.map((employeeUsername) => {
        return {
          employeeId: allEmployees.find((emp) => emp.username === employeeUsername)
            .employeeId,
          courseId: course.courseId,
          status: "ASSIGNED",
          deadline: deadline, // The deadline from input field
        };
      });

      // Call assignCourse API for each employee
      for (let dto of courseAssignments) {
        console.log("Selected Deadline:", deadline); // This will log the value of the deadline.
        await assignCourse(dto); // Call the backend API for each DTO
      }

      // SweetAlert2 Success alert
      Swal.fire({
        title: 'Success!',
        text: `Course assigned to: ${selectedEmployees.join(", ")}`,
        icon: 'success',
        confirmButtonText: 'Close',
      }).then(() => {
        navigate('/courselist'); // Redirect after closing the alert
      });
    } catch (error) {
      console.error("Error assigning course:", error);

      // SweetAlert2 Error alert
      Swal.fire({
        title: 'Error!',
        text: 'There was an error assigning the course. Please try again.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex bg-light">
      {/* Sidebar */}
      <div className="w-25 bg-dark text-white p-4 position-fixed h-100">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-75 ms-auto p-4">
        <div className="card shadow-lg p-4 position-relative">
          {/* Close Button (Cross Mark) */}
          <button
            onClick={handleClose}
            className="btn btn-danger position-absolute top-0 end-0 p-2"
            style={{ fontSize: '1.5rem', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
          >
            &times;
          </button>

          <h3 className="h3 text-dark mb-4">
            Assign Course to Employees
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Course Details:</label>
              <p><strong>Course Id:</strong> {course.courseId}</p>
              <p><strong>Course Name:</strong> {course.courseName}</p>
              <p><strong>Key Concepts:</strong> {course.keyConcepts}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <strong>Required Employees:</strong>
              {course.trainingRequest.requiredEmployees &&
              course.trainingRequest.requiredEmployees.length > 0 ? (
                <ul className="list-unstyled">
                  {course.trainingRequest.requiredEmployees.map((employee, index) => (
                    <li key={index} className="text-dark">{employee.username}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No employees assigned.</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="start-date" className="form-label">Deadline:</label>
              <input
                type="date"
                id="start-date"
                value={deadline}
                onChange={handleDeadlineChange}
                required
                className="form-control"
              />
            </div>

            <div>
              <h4 className="h4 text-dark mb-3">Select Employees:</h4>
              <div className="form-check">
                {unassignedEmployees.map((employee, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      id={employee.username}
                      value={employee.username}
                      onChange={handleEmployeeChange}
                      className="form-check-input"
                    />
                    <label htmlFor={employee.username} className="form-check-label">
                      {employee.username} ({employee.email})
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Assign Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseAssignment;
