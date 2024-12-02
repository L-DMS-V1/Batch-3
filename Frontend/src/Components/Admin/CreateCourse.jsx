import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCourse } from "../Api";
import Swal from "sweetalert2";
import AdminNavbar from "./AdminNavbar";

function CreateCourse() {
  const location = useLocation();
  const navigator = useNavigate();
  const { requestData } = location.state || {};

  // Initialize formData with requestData values or default to empty strings
  const [formData, setFormData] = useState({
    courseName: requestData?.courseName || "",
    keyConcepts: requestData?.concepts || "",
    duration: requestData?.duration || "",
    resourceLinks: "",
    otherLinks: "",
    outcomes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCourse(requestData?.requestId, formData);
      if (response.data === "Course Created Successfully") {
        Swal.fire("Success", "Course Created Successfully", "success");
        navigator("/courselist");
      } else {
        Swal.fire("Error", "Failed to create requested Course", "error");
        navigator("/admin");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Request creation failed", "error");
    }
  };

  const handleClose = () => {
    navigator("/admin");
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 bg-dark text-white p-4 position-fixed"
          style={{ top: 0, bottom: 0, left: 0, width: "250px" }}
        >
          <AdminNavbar />
        </div>

        {/* Main Content */}
        <div className="col-md-9 offset-md-3" style={{ marginTop: "50px" }}>
          <div className="card p-4 mt-5 mx-4">
            <div className="d-flex justify-content-between">
              <h2 className="text-center mb-4">Create Course</h2>
              <button
                className="btn btn-danger"
                onClick={handleClose}
                style={{ position: "absolute", top: "10px", right: "10px" }}
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-auto" style={{ maxHeight: "70vh" }}>
              <div className="mb-3">
                <input
                  type="text"
                  name="courseName"
                  placeholder="Course Name"
                  className="form-control"
                  value={formData.courseName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="keyConcepts"
                  placeholder="Key Concepts"
                  className="form-control"
                  value={formData.keyConcepts}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  className="form-control"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="resourceLinks"
                  placeholder="Resource Links"
                  className="form-control"
                  value={formData.resourceLinks}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="otherLinks"
                  placeholder="Other Links"
                  className="form-control"
                  value={formData.otherLinks}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="outcomes"
                  placeholder="Outcomes"
                  className="form-control"
                  value={formData.outcomes}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
