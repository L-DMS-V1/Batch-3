import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Form, Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const FeedbackReports = () => {
  // State to handle feedback data and selected feedback
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filteredCourse, setFilteredCourse] = useState("All");
  const [filteredType, setFilteredType] = useState("All");

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get("/api/feedback"); // Adjust the endpoint as needed
        setFeedbackData(response.data);
        setSelectedFeedback(response.data[0]); // Set default selected feedback
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, []);

  // Chart.js configuration
  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: `${selectedFeedback?.course} Feedback`,
        data: [
          selectedFeedback?.positive || 0,
          selectedFeedback?.neutral || 0,
          selectedFeedback?.negative || 0,
        ],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "course") {
      setFilteredCourse(value);
    } else if (name === "feedbackType") {
      setFilteredType(value);
    }
  };

  // Apply filter logic
  const applyFilter = () => {
    const filteredData = feedbackData.filter((feedback) => {
      const courseMatch = filteredCourse === "All" || feedback.course === filteredCourse;
      const typeMatch =
        filteredType === "All" ||
        (filteredType === "Positive" && feedback.positive > 0) ||
        (filteredType === "Neutral" && feedback.neutral > 0) ||
        (filteredType === "Negative" && feedback.negative > 0);
      return courseMatch && typeMatch;
    });
    setFeedbackData(filteredData);
    setSelectedFeedback(filteredData[0]); // Reset selected feedback
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Feedback Reports</h2>

      {/* Feedback Table */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Feedback Summary</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course</th>
                    <th>Positive</th>
                    <th>Neutral</th>
                    <th>Negative</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackData.map((feedback, index) => (
                    <tr key={feedback.id}>
                      <td>{index + 1}</td>
                      <td>{feedback.course}</td>
                      <td>{feedback.positive}%</td>
                      <td>{feedback.neutral}%</td>
                      <td>{feedback.negative}%</td>
                      <td>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => setSelectedFeedback(feedback)}
                        >
                          View Chart
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Feedback Chart */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>{selectedFeedback?.course} Feedback Chart</h5>
              <div style={{ height: "300px" }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        ```javascript
        </Col>
      </Row>

      {/* Filter Section */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h5>Filter Feedback</h5>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Course</Form.Label>
                      <Form.Control as="select" name="course" onChange={handleFilterChange}>
                        <option>All</option>
                        {feedbackData.map((feedback) => (
                          <option key={feedback.id}>{feedback.course}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Feedback Type</Form.Label>
                      <Form.Control as="select" name="feedbackType" onChange={handleFilterChange}>
                        <option>All</option>
                        <option>Positive</option>
                        <option>Neutral</option>
                        <option>Negative</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="d-flex align-items-end">
                    <Button variant="success" onClick={applyFilter}>Apply Filter</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackReports;