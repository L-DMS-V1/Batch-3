import React from 'react';
import './AddEmpoyeeModal.css';

function AddEmployeeModal({
  show,
  newEmployee,
  onChange,
  onAddEmployee,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Employee</h2>
        <input
          type="text"
          name="name"
          value={newEmployee.name}
          onChange={onChange}
          placeholder="Employee Name"
        />
        <input
          type="text"
          name="age"
          value={newEmployee.age}
          onChange={onChange}
          placeholder="Age"
        />
        {/* Other fields like email, trainer, joined date */}
        <button onClick={onAddEmployee}>Add Employee</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
