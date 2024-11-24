// Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar({ onSelectSection }) {
  return (
    <div className="sidebar">
      <button onClick={() => onSelectSection('EmployeeList')}>Employee List</button>
      <button onClick={() => onSelectSection('EmployeeDetails')}>Courses Assigned</button>
    </div>
  );
}

export default Sidebar;
