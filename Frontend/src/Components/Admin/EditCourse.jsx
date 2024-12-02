import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { editCourse } from "../Api";
import AdminNavbar from "./AdminNavbar";

function EditCourse() {
  const navigator = useNavigate();
  const location = useLocation();
  const { course } = location.state || {};

  const [formData, setFormData] = useState({
    courseName: course.courseName,
    keyConcepts: course.keyConcepts,
    duration: course.duration,
    resourceLinks: course.resourceLinks,
    otherLinks: course.otherLinks,
    outcomes: course.outcomes,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save these changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await editCourse(course.courseId, formData);
        if (response.data === "Course Updated Successfully") {
          Swal.fire("Success!", "Changes submitted successfully.", "success");
          navigator("/courselist");
        } else {
          Swal.fire("Error!", "Failed to update the selected course.", "error");
          navigator("/admin");
        }
      } catch (error) {
        Swal.fire("Error!", "Request creation failed.", "error");
      }
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <AdminNavbar />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
        <div className="card shadow-lg w-100" style={{ maxWidth: "600px" }}>
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Edit Course</h5>
            <button
              className="btn btn-close btn-close-white"
              onClick={() => navigator("/courselist")}
            ></button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="courseName" className="form-label">
                  Course Name
                </label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  placeholder="Course Name"
                  className="form-control"
                  value={formData.courseName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keyConcepts" className="form-label">
                  Key Concepts
                </label>
                <input
                  type="text"
                  id="keyConcepts"
                  name="keyConcepts"
                  placeholder="Key Concepts"
                  className="form-control"
                  value={formData.keyConcepts}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="Duration"
                  className="form-control"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="resourceLinks" className="form-label">
                  Resource Links
                </label>
                <input
                  type="text"
                  id="resourceLinks"
                  name="resourceLinks"
                  placeholder="Resource Links"
                  className="form-control"
                  value={formData.resourceLinks}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="otherLinks" className="form-label">
                  Other Links
                </label>
                <input
                  type="text"
                  id="otherLinks"
                  name="otherLinks"
                  placeholder="Other Links"
                  className="form-control"
                  value={formData.otherLinks}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="outcomes" className="form-label">
                  Outcomes
                </label>
                <input
                  type="text"
                  id="outcomes"
                  name="outcomes"
                  placeholder="Outcomes"
                  className="form-control"
                  value={formData.outcomes}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigator("/courselist")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
