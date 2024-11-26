import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import './styles.css';

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  // Fetch assessments from the backend
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get("/api/assessments"); // Adjust endpoint as necessary
        setAssessments(response.data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };

    fetchAssessments();
  }, []);

  // Open the quiz modal for the selected assessment
  const handleOpenQuiz = (assessment) => {
    setCurrentAssessment(assessment);
    setAnswers([]);
    setQuizSubmitted(false);
    setQuizScore(null);
    setShowModal(true);
  };

  // Handle submitting a quiz
  const handleSubmitQuiz = async () => {
    // Simulate score calculation (for demonstration)
    const score = Math.floor(Math.random() * 100);
    setQuizScore(score);

    // Mark the quiz as completed and save score to backend
    try {
      await axios.put(`/api/assessments/${currentAssessment.id}`, {
        completed: true,
        score,
      }); // Adjust endpoint as necessary

      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === currentAssessment.id
            ? { ...assessment, completed: true, score }
            : assessment
        )
      );
    } catch (error) {
      console.error("Error updating assessment:", error);
    }

    setQuizSubmitted(true);
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Employee Assessments</h2>
      <Row>
        {assessments.map((assessment) => (
          <Col md={4} key={assessment.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{assessment.title}</Card.Title>
                <Card.Text>{assessment.description}</Card.Text>
                {assessment.completed ? (
                  <div>
                    <p className="text-success">
                      Completed! Score: {assessment.score}%
                    </p>
                    <ProgressBar
                      now={assessment.score}
                      label={`${assessment.score}%`}
                      variant="success"
                    />
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleOpenQuiz(assessment)}
                  >
                    Take Quiz
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quiz Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentAssessment?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!quizSubmitted ? (
            <Form>
              <h5>Sample Questions:</h5>
              <Form.Group className="mb-3">
                <Form.Label>1. What is React?</Form.Label>
                <Form.Check
                  type="radio"
                  label="A JavaScript library for building UIs"
                  name="question1"
                  value="correct"
                  onChange={(e) => setAnswers([...answers, e.target.value])}
                />
                <Form.Check
                  type="radio"
                  label="A database management system"
                  name="question1"
                  value="incorrect"
                  onChange={(e) => setAnswers([...answers, e.target.value])}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>2. What does CSS stand for?</Form.Label>
                <Form.Check
                    type="radio"
                     label="Cascading Style Sheets"
                    name="question2" // Add closing double quote
                    value="correct"
                    onChange={(e) => setAnswers([...answers, e.target.value])}
               />
                <Form.Check
                  type="radio"
                  label="Creative Style System"
                  name="question2"
                  value="incorrect"
                  onChange={(e) => setAnswers([...answers, e.target.value])}
                />
              </Form.Group>
            </Form>
          ) : (
            <div className="text-center">
              <h4>Your Score: {quizScore}%</h4>
              {quizScore > 70 ? (
                <p className="text-success">Congratulations! You passed!</p>
              ) : (
                <p className="text-danger">Better luck next time!</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!quizSubmitted ? (
            <Button variant="primary" onClick={handleSubmitQuiz}>
              Submit Quiz
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Assessments;