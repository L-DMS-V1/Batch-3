import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateAssessment } from '../Api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import AdminNavbar from './AdminNavbar';

const UpdateAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentDetails } = location.state || {};

  const [totalMarks, setTotalMarks] = useState(assessmentDetails?.totalMarks || 0);
  const [passingMarks, setPassingMarks] = useState(assessmentDetails?.passingMarks || 0);
  const [duration, setDuration] = useState(assessmentDetails?.duration || 0);
  const [formQuestions, setFormQuestions] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (assessmentDetails?.questions) {
      const formattedQuestions = assessmentDetails.questions.map((q) => ({
        questionText: q.questionText,
        options: [q.optionA, q.optionB, q.optionC, q.optionD],
        correctAnswer: q.correctOption,
      }));
      setFormQuestions(formattedQuestions);
    }
  }, [assessmentDetails]);

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

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...formQuestions];
    updatedQuestions.splice(index, 1);
    setFormQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    };
    setFormQuestions([...formQuestions, newQuestion]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

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
      courseId: assessmentDetails.course.courseId,
      questions: formattedQuestions,
      totalMarks: Number(totalMarks),
      passingMarks: Number(passingMarks),
      duration: Number(duration),
    };

    try {
      const response = await updateAssessment(payload);
      console.log('Assessment updated successfully:', response.data);
      alert('Assessment updated successfully!');
      navigate('/courselist');
    } catch (error) {
      console.error('Error updating assessment:', error);
      alert('Failed to update assessment. Please try again.');
    }
  };

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const handleGoBack = () => {
    navigate(-1); // This will navigate to the previous page in history
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="bg-dark text-white p-3 position-sticky" style={{ top: 0, height: '100vh', width: '250px' }}>
          <AdminNavbar />
          {/* Sidebar content */}
          {/* Add any sidebar content here */}
        </div>
      )}

      {/* Right Content */}
      <div className="flex-grow-1 p-5">
        <div className="bg-white p-4 shadow-sm rounded">
        <button onClick={handleGoBack} className="btn btn-primary mb-4">
            Go Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Update Assessment</h1>

          {/* Go Back Button */}
          

          {/* Total Marks */}
          <div className="mb-6">
            <label className="form-label">Total Marks</label>
            <input
              type="number"
              onChange={(e) => setTotalMarks(e.target.value)}
              value={totalMarks}
              className="form-control"
              placeholder="Enter total marks"
            />
          </div>

          {/* Passing Marks */}
          <div className="mb-6">
            <label className="form-label">Passing Marks</label>
            <input
              type="number"
              onChange={(e) => setPassingMarks(e.target.value)}
              value={passingMarks}
              className="form-control"
              placeholder="Enter passing marks"
            />
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label className="form-label">Duration (in minutes)</label>
            <input
              type="number"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              className="form-control"
              placeholder="Enter duration"
            />
          </div>

          {/* Questions */}
          {formQuestions.map((question, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-light">
              <h3 className="text-lg font-semibold mb-4">Question {qIndex + 1}</h3>
              {/* Question Text */}
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="form-control mb-4"
                placeholder="Enter the question"
              />
              {/* Options */}
              <div className="mb-4">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="d-flex mb-2">
                    <label className="form-label">Option {optIndex + 1}</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                      className="form-control me-2"
                      placeholder={`Enter option ${optIndex + 1}`}
                    />
                  </div>
                ))}
              </div>

              {/* Correct Answer */}
              <div className="mb-4">
                <label className="form-label">Correct Answer</label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Correct Answer</option>
                  {question.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option || `Option ${optIndex + 1}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remove Question Button */}
              <button onClick={() => handleRemoveQuestion(qIndex)} className="btn btn-danger">
                Remove
              </button>
            </div>
          ))}

          {/* Add New Question Button */}
          <div className="text-center mb-4">
            <button onClick={handleAddQuestion} className="btn btn-success">
              Add New Question
            </button>
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmitForm} className="btn btn-primary">
            Update Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAssessment;
