import React, { useState } from 'react';
import './TrainingRequestForm.css';

const TrainingRequestForm = () => {
  const [trainingRequests, setTrainingRequests] = useState({
    username: '',
    courseName: '',
    description: '',
    concepts: '',
    duration: '',
    employeePosition: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrainingRequests((prevRequests) => ({ ...prevRequests, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call API to submit training request
    console.log('Training request submitted:', trainingRequests);
  };

  return (
    <div className="training-request-container">
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
         <h1 style={{ color: '#6a11cb' }}>Training Request Form</h1>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={trainingRequests.username}
            onChange={handleInputChange}
          />
          <br />
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={trainingRequests.courseName}
            onChange={handleInputChange}
          />
          <br />
          <label>Description:</label>
          <textarea
            name="description"
            value={trainingRequests.description}
            onChange={handleInputChange}
          />
          <br />
          <label>Concepts:</label>
          <textarea
            name="concepts"
            value={trainingRequests.concepts}
            onChange={handleInputChange}
          />
          <br />
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={trainingRequests.duration}
            onChange={handleInputChange}
          />
          <br />
          <label>Employee Position:</label>
          <input
            type="text"
            name="employeePosition"
            value={trainingRequests.employeePosition}
            onChange={handleInputChange}
          />
          <br />
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default TrainingRequestForm;