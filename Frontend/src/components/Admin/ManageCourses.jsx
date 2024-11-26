import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";

const ManageCourses = () => {
  // State for courses and modal visibility
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentCourse, setCurrentCourse] = useState({
    id: null,
    name: "",
    description: "",
    duration: "",
  });

  // Fetch courses from the backend on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses"); // Adjust the endpoint as needed
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Open modal for adding or editing a course
  const handleOpenModal = (type, course = null) => {
    setModalType(type);
    if (type === "edit" && course) {
      setCurrentCourse(course);
    } else {
      setCurrentCourse({ id: null, name: "", description: "", duration: "" });
    }
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
  };

  // Handle adding or updating a course
  const handleSaveCourse = async () => {
    try {
      if (modalType === "add") {
        const response = await axios.post("/api/courses", currentCourse); // Adjust the endpoint as needed
        setCourses([...courses, response.data]); // Assuming the response contains the added course
      } else if (modalType === "edit") {
        const response = await axios.put(`/api/courses/${currentCourse.id}`, currentCourse); // Adjust the endpoint as needed
        setCourses(
          courses.map((course) =>
            course.id === currentCourse.id ? response.data : course
          )
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course.");
    }
  };

  // Handle deleting a course
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`); // Adjust the endpoint as needed
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Manage Courses</h2>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => handleOpenModal("add")}
                  >
                    Add New Course
                  </Button>
                </Col>
              </Row>

              {/* Courses Table */}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course.id}>
                      <td>{index + 1}</td>
                      <td>{course.name}</td>
                      <td>{course.description}</td>
                      <td>{course.duration}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal("edit", course)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </ tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Adding/Editing Courses */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add New Course" : "Edit Course"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="name"
                value={currentCourse.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter course description"
                name="description"
                value={currentCourse.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 4 weeks"
                name="duration"
                value={currentCourse.duration}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCourse}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageCourses;