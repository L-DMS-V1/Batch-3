import React from 'react';
import './AssignCourseModal.css';

function AssignCourseModal({
  show,
  employees,
  courseData,
  onAssignCourse,
  onClose,
}) {
  if (!show) return null;

  const handleAssign = () => {
    onAssignCourse(courseData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Assign Course</h2>
        <select>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Course Name"
          value={courseData.name}
          onChange={(e) => courseData.setName(e.target.value)}
        />
        <button onClick={handleAssign}>Assign Course</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AssignCourseModal;
