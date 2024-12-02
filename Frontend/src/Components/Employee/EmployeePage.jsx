import React, { useState, useEffect } from "react";
import Navbar from "./EmployeeNavbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAssignments,
  getCourseProgress,
  updateCourseProgress,
  getEmployeeAssessments,
} from "../Api";

function EmployeePage() {
  const [isProgressDropdownOpen, setIsProgressDropdownOpen] = useState(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [newProgressPercentage, setNewProgressPercentage] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [ongoingAssignmentsCount, setongoingAssignmentsCount] = useState(0);
  const [completedAssignmentsCount, setcompletedAssignmentsCount] = useState(0);
  const [totalAssignmentsCount, settotalAssignmentsCount] = useState(0);
  const [completedCourses, setCompletedCourses] = useState([]);

  const navigator = useNavigate();

  const toggleProgressDropdown = () => {
    setIsProgressDropdownOpen(!isProgressDropdownOpen);
  };

  const toggleLearningDropdown = () => {
    setIsLearningDropdownOpen(!isLearningDropdownOpen);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const mockAssignments = await getAssignments();
        setAssignments(mockAssignments);
        settotalAssignmentsCount(mockAssignments.length);
        setongoingAssignmentsCount(
          mockAssignments.filter(
            (assignment) => assignment.status === "ASSIGNED"
          ).length
        );
        setcompletedAssignmentsCount(
          mockAssignments.filter(
            (assignment) => assignment.status === "COMPLETED"
          ).length
        );
        console.log(completedAssignmentsCount);
      } catch (error) {
        console.error("Error fetching assigned courses:", error);
      }
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const data = await getCourseProgress();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    fetchCourseProgress();
  }, []);

  useEffect(() => {
    const fetchEmployeeAssessments = async () => {
      try {
        const EmployeeAssessments = await getEmployeeAssessments();

        // Extract the course IDs where the result is "PASS"
        const passedCourses = EmployeeAssessments.filter(
          (EmployeeAssessment) => EmployeeAssessment.result === "PASS"
        ).map(
          (EmployeeAssessment) => EmployeeAssessment.assessment.course.courseId
        );

        setCompletedCourses(passedCourses);
      } catch (error) {
        console.error("Error fetching employee assessments:", error);
      }
    };

    fetchEmployeeAssessments();
  }, []);

  const openUpdateModal = (progress) => {
    setSelectedProgress(progress);
    setIsUpdateModalOpen(true);
  };

  const takeAssessment = (progress) => {
    // Logic for handling the assessment action
    navigator("/takeassessment", {
      state: {
        courseId: progress.course.courseId,
        employeeId: progress.employee.employeeId,
      },
    });
    console.log(`Taking assessment for: ${progress.course.courseName}`);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProgress(null);
    setNewProgressPercentage("");
  };

  const handleUpdateProgress = async () => {
    if (!newProgressPercentage || isNaN(newProgressPercentage)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid progress percentage!",
      });
      return;
    }
  
    const updatedProgress = {
      courseId: selectedProgress.course.courseId,
      employeeId: selectedProgress.employee.employeeId,
      progressPercentage: Number(newProgressPercentage),
      status: selectedProgress.status,
    };
  
    try {
      await updateCourseProgress(updatedProgress);
  
      Swal.fire({
        icon: "success",
        title: "Progress Updated!",
        text: "Progress updated successfully!",
      }).then(() => {
        closeUpdateModal();
  
        // Refresh the progress data
        getCourseProgress().then((updatedData) => setProgressData(updatedData));
      });
    } catch (error) {
      console.error("Error updating progress:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update progress!",
      });
    }
  };

  const handleViewClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleClosePopup = () => {
    setSelectedAssignment(null);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Title */}
      <h2 className="text-center display-4 mt-4">Employee Dashboard</h2>

      {/* Stats Boxes */}
      <div className="d-flex justify-content-center mt-4 gap-3">
        <div className="card text-center p-4 bg-info text-white w-25">
          <h5>Total Courses Assigned</h5>
          <p className="display-4">{totalAssignmentsCount}</p>
        </div>
        <div className="card text-center p-4 bg-success text-white w-25">
          <h5>Total Courses Ongoing</h5>
          <p className="display-4">{ongoingAssignmentsCount}</p>
        </div>
        <div className="card text-center p-4 bg-warning text-white w-25">
          <h5>Total Courses Completed</h5>
          <p className="display-4">{completedAssignmentsCount}</p>
        </div>
      </div>

      <div className="mt-4">
  {/* Combined Table for My Learning and My Progress */}
  <div className="card p-3 bg-primary text-white">
    <h4 className="h5">My Learning & Progress</h4>
  </div>

  {/* Combined Table Content */}
  <div className="bg-white p-3 rounded shadow mt-2">
    <table className="table">
      <thead>
        <tr>
          <th>Course</th>
          <th>Progress</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment, index) => {
          // Find progress for each assignment
          const progress = progressData.find(
            (prog) => prog.course.courseId === assignment.course.courseId
          );
          const isCompleted = completedCourses.includes(assignment.course.courseId);
          const progressPercentage = progress ? progress.progressPercentage : 0;

          return (
            <tr key={assignment.course.courseId}>
              <td>
                {assignment.course.courseName}
              </td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <span>{progressPercentage}%</span>
                </div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className={`btn ${
                      isCompleted
                        ? "btn-secondary"
                        : progressPercentage === 100
                        ? "btn-success"
                        : "btn-primary"
                    }`}
                    disabled={isCompleted}
                    onClick={() =>
                      !isCompleted &&
                      (progressPercentage === 100
                        ? takeAssessment(progress)
                        : openUpdateModal(progress))
                    }
                  >
                    {isCompleted
                      ? "COMPLETED"
                      : progressPercentage === 100
                      ? "Take Assessment"
                      : "Update"}
                  </button>
                  <button
                    onClick={() => handleViewClick(assignment)}
                    className="btn btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

{/* Update Modal */}
{isUpdateModalOpen && selectedProgress && (
  <div className="modal show" style={{ display: "block" }} aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Progress: {selectedProgress.course.courseName}</h5>
          <button
            type="button"
            className="close"
            onClick={closeUpdateModal}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Progress Percentage</label>
            <input
              type="number"
              className="form-control"
              value={newProgressPercentage}
              onChange={(e) => setNewProgressPercentage(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeUpdateModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdateProgress}
          >
            update
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Popup */}
{selectedAssignment && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Course Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClosePopup}
                ></button>
              </div>
              <div className="modal-body">
  <p><strong>Course Name:</strong> {selectedAssignment.course.courseName}</p>
  <p><strong>Key Concepts:</strong> {selectedAssignment.course.keyConcepts}</p>
  <p><strong>Duration:</strong> {selectedAssignment.course.duration}</p>
  <p>
    <strong>Resource Links:</strong>{' '}
    <a 
      href={selectedAssignment.course.resourceLinks} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {selectedAssignment.course.resourceLinks}
    </a>
  </p>
  <p>
    <strong>Other Links:</strong>{' '}
    <a 
      href={selectedAssignment.course.otherLinks} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {selectedAssignment.course.otherLinks}
    </a>
  </p>
  <p><strong>Outcomes:</strong> {selectedAssignment.course.outcomes}</p>
</div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default EmployeePage;
