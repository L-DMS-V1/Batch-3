import React from 'react';
import './EmployeeList.css';

function EmployeeList({ employees }) {
  if (!employees) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Age</th>
            <th>Trainer</th>
            <th>Joined Date</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.course}</td>
              <td>{emp.age}</td>
              <td>{emp.trainer}</td>
              <td>{emp.joinedDate}</td>
              <td>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;