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

const ManageEmployees = () => {
  // State for employees and modal visibility
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    name: "",
    email: "",
    position: "",
  });

  // Fetch employees from the backend on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees"); // Adjust the endpoint as needed
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Open modal for adding or editing an employee
  const handleOpenModal = (type, employee = null) => {
    setModalType(type);
    if (type === "edit" && employee) {
      setCurrentEmployee(employee);
    } else {
      setCurrentEmployee({ id: null, name: "", email: "", position: "" });
    }
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  // Handle adding or updating an employee
  const handleSaveEmployee = async () => {
    try {
      if (modalType === "add") {
        const response = await axios.post("/api/employees", currentEmployee); // Adjust the endpoint as needed
        setEmployees([...employees, response.data]); // Assuming the response contains the added employee
      } else if (modalType === "edit") {
        const response = await axios.put(`/api/employees/${currentEmployee.id}`, currentEmployee); // Adjust the endpoint as needed
        setEmployees(
          employees.map((employee) =>
            employee.id === currentEmployee.id ? response.data : employee
          )
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee.");
    }
  };

  // Handle deleting an employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`); // Adjust the endpoint as needed
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Manage Employees</h2>
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
                    Add New Employee
                  </Button>
                </Col>
              </Row>

              {/* Employees Table */}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.position}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal("edit", employee)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for adding or editing an employee */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add Employee" : "Edit Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmployeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentEmployee.name}
                onChange={handleInputChange}
                placeholder="Enter employee name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmployeeEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentEmployee.email}
                onChange={handleInputChange}
                placeholder="Enter employee email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmployeePosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={currentEmployee.position}
                onChange={handleInputChange}
                placeholder="Enter employee position"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEmployee}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageEmployees;