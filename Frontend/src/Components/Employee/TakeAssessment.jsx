import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAssessment, submitAssessment } from "../Api";
import Modal from "./Modal";

const TakeAssessment = () => {
  const location = useLocation();
  const { courseId, employeeId } = location.state || {};
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultData, setResultData] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Timer state
  const [pauseModalOpen, setPauseModalOpen] = useState(false); // Pause modal state

  const timerRef = useRef(null); // Reference for the timer
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false); // To avoid duplicate submissions

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
          clearInterval(timerRef.current); // Ensure timer stops
          return 0; // Prevent negative time
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    // If timer hits 0, trigger submission
    if (seconds === 0 && !isAutoSubmitting) {
      setIsAutoSubmitting(true); // Prevent duplicate submission
      handleSubmit();
    }

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOptionChange = (questionIndex, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = option;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    setPauseModalOpen(false);
    clearInterval(timerRef.current); // Stop the timer on submission
    const submissionData = {
      assessmentId: assessment.assessmentId,
      employeeId: employeeId,
      answers,
    };

    try {
      const result = await submitAssessment(submissionData);
      if (result === "Congratulations!! Assessment Cleared Successfully!!")
        setResultData("PASS");
      else setResultData("RETRY");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  const handlePause = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
    setPauseModalOpen(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setPauseModalOpen(false);
  };

  if (!assessment) return <p>Loading assessment...</p>;

  return (
    <div className="container py-5">
      <h1 className="display-6 mb-4">Assessment: {assessment.course.courseName}</h1>
      <p className="text-muted mb-2">Duration: {assessment.duration} minutes</p>
      <p className="text-danger mb-4">Time Remaining: {formatTime(timeLeft)}</p>
      <div className="mb-4">
        {assessment.questions.map((question, index) => (
          <div key={question.questionId} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                {index + 1}. {question.questionText}
              </h5>
              <div className="mt-3">
                {["A", "B", "C", "D"].map((option, i) => (
                  <div key={i} className="form-check">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      className="form-check-input"
                      value={question[`option${option}`]}
                      checked={answers[index] === question[`option${option}`]}
                      onChange={() => handleOptionChange(index, question[`option${option}`])}
                    />
                    <label className="form-check-label">{question[`option${option}`]}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex gap-3">
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          onClick={handlePause}
          className="btn btn-warning"
        >
          Pause
        </button>
      </div>

      {/* Result Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="card">
            <div className="card-body">
              <h2 className="h5 mb-3">Assessment Results</h2>
              <p>Result: {resultData}</p>
              {resultData === "PASS" ? (
                <button
                  onClick={() =>
                    navigate("/givefeedback", {
                      state: { courseId, employeeId },
                    })
                  }
                  className="btn btn-success mt-3"
                >
                  Give Feedback
                </button>
              ) : (
                <button
                  onClick={() => navigate("/employee")}
                  className="btn btn-danger mt-3"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Pause Modal */}
      {pauseModalOpen && (
        <Modal onClose={() => setPauseModalOpen(false)}>
          <div className="card">
            <div className="card-body">
              <h2 className="h5 mb-3">Paused</h2>
              <p className="mb-3">Do you want to resume or end the test?</p>
              <div className="d-flex gap-3">
                <button
                  onClick={handleResume}
                  className="btn btn-success"
                >
                  Resume
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-danger"
                >
                  End Test
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TakeAssessment;
