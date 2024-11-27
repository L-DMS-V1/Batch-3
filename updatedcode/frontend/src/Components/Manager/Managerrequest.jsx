import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest, getAllEmployees } from "../Api";
import Swal from "sweetalert2";

function Managerrequest() {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    concepts: "",
    duration: "",
    employeePosition: "",
    requiredEmployees: [], // To store selected employee objects
  });

  const [employees, setEmployees] = useState([]); // Store fetched employee data
  const [message, setMessage] = useState(""); // For success/error messages
  const navigate = useNavigate(); // Navigation hook

  // Fetch all employees on component mount
  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const response = await getAllEmployees();
  //       setEmployees(response); // Assuming response.data contains the employee list
  //       console.log("From Manger request page" + employees);
  //     } catch (error) {
  //       console.error("Failed to fetch employees", error);
  //     }
  //   };
  //   fetchEmployees();
  // }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle employee selection from dropdown
  // const handleEmployeeSelect = (e) => {
  //   const employeeId = parseInt(e.target.value, 10);
  //   const selectedEmployee = employees.find((emp) => emp.employeeId === employeeId);

  //   if (selectedEmployee && !formData.requiredEmployees.some((emp) => emp.employeeId === employeeId)) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       requiredEmployees: [...prev.requiredEmployees, selectedEmployee],
  //     }));
  //   }
  // };

  // Handle removal of selected employee
  // const handleRemoveEmployee = (employeeId) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     requiredEmployees: prev.requiredEmployees.filter((emp) => emp.employeeId !== employeeId),
  //   }));
  // };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRequest(formData);
      if (response.data === "Request created successfully") {
        // Show success modal
        Swal.fire({
          title: "Success!",
          text: "Request created successfully.",
          icon: "success",
          timer: 2000, // Modal auto-closes in 2 seconds
          showConfirmButton: false,
        }).then(() => {
          navigate("/manager"); // Navigate after modal closes
        });
      } else {
        // Show error modal
        Swal.fire({
          title: "Error!",
          text: response.data || "Request creation failed",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Request creation failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-4 w-100 w-md-75">
        <h2 className="text-center text-2xl font-bold mb-4">Create Request</h2>
        {message && (
          <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          {["courseName", "description", "concepts", "duration"].map((field) => (
            <div className="mb-3" key={field}>
              <input
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()} // Format placeholder nicely
                className="form-control"
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Employee Dropdown */}
          {/* <div className="mb-3">
            <label htmlFor="employees" className="form-label">Select Employees:</label>
            <select
              id="employees"
              className="form-select"
              onChange={handleEmployeeSelect}
            >
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.accountName} - {employee.email}
                </option>
              ))}
            </select>
          </div> */}

          {/* Selected Employees List */}
          {/* <div className="mb-3">
            <h5 className="font-medium">Selected Employees:</h5>
            {formData.requiredEmployees.length > 0 ? (
              formData.requiredEmployees.map((emp) => (
                <div
                  key={emp.employeeId}
                  className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2"
                >
                  <span>{emp.accountName}</span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveEmployee(emp.employeeId)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted">No employees selected.</p>
            )}
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default Managerrequest;
