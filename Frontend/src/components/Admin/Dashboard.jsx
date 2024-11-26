import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";

const AdminDashboard = () => {
  // State for managing modals and data
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  
  // Fetch employees and courses from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees"); // Adjust the endpoint as needed
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses"); // Adjust the endpoint as needed
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchEmployees();
    fetchCourses();
  }, []);

  // Open modal to assign a course
  const handleAssignCourse = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Submit assigned course
  const handleSubmit = async (courseId) => {
    try {
      await axios.post(`/api/assign-course`, {
        employeeId: selectedEmployee.id,
        courseId: courseId,
      });
      alert("Course assigned successfully!");
      setShowModal(false);
      setSelectedEmployee(null);
      // Optionally, refresh the employee data
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error assigning course:", error);
      alert("Failed to assign course.");
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Cards Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Employees</Card.Title>
              <h3>{employees.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Active Courses</Card.Title>
              <h3>{courses.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Pending Feedback</Card.Title>
              <h3>5</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Employee Management Table */}
      <Row>
        <Col>
          <h4>Employee Management</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.progress}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAssignCourse(employee)}
                    >
                      Assign Course
                    </Button>{" "}
                    <Button variant="danger" size="sm">
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal for Assigning Courses */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Employee</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee?.name || ""}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Course</Form.Label>
              <Form.Control as="select" onChange={(e) => handleSubmit(e.target.value)}>
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleSubmit(selectedEmployee?.id)}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;