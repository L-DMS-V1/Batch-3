import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createAssessmet } from '../Api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import AdminNavbar from './AdminNavbar';

const DynamicForm = () => {
  const [totalMarks, setTotalMarks] = useState(0);
  const [passingMarks, setPassingMarks] = useState(0);
  const [duration, setDuration] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [formQuestions, setFormQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question

  const location = useLocation();
  const { course } = location.state || {};
  const navigate = useNavigate();

  const handleSetTotalQuestions = (e) => {
    const value = parseInt(e.target.value, 10);
    setTotalQuestions(value);

    const initialQuestions = Array(value).fill(null).map(() => ({
      questionText: '',
      options: Array(4).fill(''),
      correctAnswer: '',
    }));
    setFormQuestions(initialQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formQuestions];
    updatedQuestions[index].questionText = value;
    setFormQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...formQuestions];
    updatedQuestions[qIndex].options[optionIndex] = value;
    setFormQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...formQuestions];
    updatedQuestions[qIndex].correctAnswer = value;
    setFormQuestions(updatedQuestions);
  };

  const handlesetTotalMarks = (e) => {
    setTotalMarks(e.target.value);
  };

  const handlesetPassingMarks = (e) => {
    setPassingMarks(e.target.value);
  };

  const handlesetDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitForm = async (e) => {
    const isValid = formQuestions.every((q) =>
      q.questionText.trim() &&
      q.options.every((opt) => opt.trim()) &&
      q.correctAnswer.trim()
    );

    if (!isValid) {
      alert('Please fill out all questions, options, and select a correct answer.');
      return;
    }

    const formattedQuestions = formQuestions.map((q) => ({
      questionText: q.questionText,
      optionA: q.options[0],
      optionB: q.options[1],
      optionC: q.options[2],
      optionD: q.options[3],
      correctOption: q.correctAnswer,
    }));

    const payload = {
      courseId: course.courseId,
      questions: formattedQuestions,
      totalMarks: Number(totalMarks),
      passingMarks: Number(passingMarks),
      duration: Number(duration),
    };

    try {
      const response = await createAssessmet(payload);
      console.log("Assessment created successfully:", response.data);
      alert("Assessment created successfully!");
      navigate('/courselist');
    } catch (error) {
      console.error("Error creating assessment:", error);
      alert("Failed to create assessment. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-4">
          <AdminNavbar />
        </div>

        {/* Form Section */}
        <div className="col-md-9 p-4">
          <div className="bg-white p-4 rounded shadow-sm">
          <button
              className="btn btn-primary mb-3"
              onClick={() => navigate('/courselist')}
            >
            GO BACK
            </button>
            <h1 className="h3 mb-4">Create Assessments</h1>

            {/* Close Button */}
          

            {/* Select Number of Questions */}
            <div className="mb-3">
              <label className="form-label">Number of Questions</label>
              <input
                type="number"
                onChange={handleSetTotalQuestions}
                value={totalQuestions}
                className="form-control"
                placeholder="Enter number of questions"
                min="1"
              />
            </div>

            {/* Total Marks */}
            <div className="mb-3">
              <label className="form-label">Total Marks</label>
              <input
                type="number"
                onChange={handlesetTotalMarks}
                value={totalMarks}
                className="form-control"
                placeholder="Enter total marks"
                min="1"
              />
            </div>

            {/* Passing Marks */}
            <div className="mb-3">
              <label className="form-label">Passing Marks</label>
              <input
                type="number"
                onChange={handlesetPassingMarks}
                value={passingMarks}
                className="form-control"
                placeholder="Enter Passing Marks"
                min="1"
              />
            </div>

            {/* Duration */}
            <div className="mb-3">
              <label className="form-label">Duration of the assessment (minutes)</label>
              <input
                type="number"
                onChange={handlesetDuration}
                value={duration}
                className="form-control"
                placeholder="Enter duration of the assessment"
                min="1"
              />
            </div>

            {/* Display the current question */}
            {formQuestions.length > 0 && (
              <div key={currentQuestionIndex} className="mb-4 p-3 border rounded bg-light">
                <h4 className="h5">Question {currentQuestionIndex + 1}</h4>

                {/* Question Text */}
                <input
                  type="text"
                  value={formQuestions[currentQuestionIndex]?.questionText}
                  onChange={(e) => handleQuestionChange(currentQuestionIndex, e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter the question"
                />

                {/* Options */}
                {formQuestions[currentQuestionIndex]?.options.map((option, optIndex) => (
                  <div key={optIndex} className="mb-3">
                    <label className="form-label">Option {optIndex + 1}</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(currentQuestionIndex, optIndex, e.target.value)}
                      className="form-control"
                      placeholder={`Enter option ${optIndex + 1}`}
                    />
                  </div>
                ))}

                {/* Correct Answer */}
                <div className="mb-3">
                  <label className="form-label">Correct Answer</label>
                  <select
                    value={formQuestions[currentQuestionIndex]?.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(currentQuestionIndex, e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Correct Answer</option>
                    {formQuestions[currentQuestionIndex]?.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>
                        {option || `Option ${optIndex + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Navigation Button */}
            <div>
              {currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  onClick={handleSubmitForm}
                  className="btn btn-primary"
                >
                  Submit Form
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="btn btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
