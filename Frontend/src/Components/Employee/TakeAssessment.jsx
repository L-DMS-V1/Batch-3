import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAssessment, submitAssessment } from "../Api";

const TakeAssessment = () => {
  const location = useLocation();
  const { courseId, employeeId } = location.state || {};
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [timeLeft, setTimeLeft] = useState(0); // Timer state
  const [isPaused, setIsPaused] = useState(false); // Pause state

  const timerRef = useRef(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const data = await getAssessment(courseId);
        setAssessment(data);
        setAnswers(new Array(data.questions.length).fill(""));
        setTimeLeft(data.duration * 60); // Convert minutes to seconds
      } catch (error) {
        console.error("Error fetching assessment:", error);
      }
    };

    fetchAssessment();
  }, [courseId]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          clearInterval(timerRef.current);
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOptionChange = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleEndTest = () => {
    clearInterval(timerRef.current);
    handleSubmit();
  };

  const handleSubmit = async () => {
    clearInterval(timerRef.current);
    const submissionData = {
      assessmentId: assessment.assessmentId,
      employeeId: employeeId,
      answers,
    };

    try {
      const result = await submitAssessment(submissionData);
      navigate("/assessment-result", { state: { result, courseId, employeeId } });
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  if (!assessment) return <p>Loading assessment...</p>;

  const currentQuestion = assessment.questions[currentQuestionIndex];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-6">Assessment: {assessment.course.courseName}</h1>
        <button onClick={handleEndTest} className="btn btn-danger">
          End Test
        </button>
      </div>
      <p className="text-muted">Duration: {assessment.duration} minutes</p>
      <p className="text-danger">Time Remaining: {formatTime(timeLeft)}</p>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {currentQuestionIndex + 1}. {currentQuestion.questionText}
          </h5>
          <div className="mt-3">
            {["A", "B", "C", "D"].map((option, i) => (
              <div key={i} className="form-check">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  className="form-check-input"
                  value={currentQuestion[`option${option}`]}
                  checked={answers[currentQuestionIndex] === currentQuestion[`option${option}`]}
                  onChange={() => handleOptionChange(currentQuestion[`option${option}`])}
                />
                <label className="form-check-label">{currentQuestion[`option${option}`]}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          className="btn btn-secondary"
        >
          Back
        </button>
        {currentQuestionIndex === assessment.questions.length - 1 ? (
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        ) : (
          <button onClick={handleNext} className="btn btn-primary">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeAssessment;
