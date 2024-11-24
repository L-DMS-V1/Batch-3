import React from 'react';
import './Header.css';

function Header({ onAddEmployeeClick, onAssignCourseClick }) {
  return (
    <div className="header">
      <h1 className="header-title">Admin Dashboard</h1>
      <div className="header-buttons">
        <button className="btn primary-btn" onClick={onAddEmployeeClick}>Add Employee</button>
        <button className="btn primary-btn" onClick={onAssignCourseClick}>Assign Course</button>
      </div>
    </div>
  );
}

export default Header;
