package com.example.LearningAndDevelopment.Model;



import com.example.LearningAndDevelopment.Model.DTO.EmployeeDTO;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "TrainingRequestTable1")
public class TrainingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requestId;

    @Column(name = "course_Name")
    private String courseName;

    @Column(name = "description")
    private String description;

    @Column(name = "concepts")
    private String concepts;

    @Column(name = "duration")
    private String duration;

    @Column(name = "employee_Position")
    private String employeePosition;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "training_request_employee", // Join table name
            joinColumns = @JoinColumn(name = "training_request_id"), // Foreign key for TrainingRequest
            inverseJoinColumns = @JoinColumn(name = "employee_id")  // Foreign key for Employee
    )
    private List<Employee> requiredEmployees;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RequestStatus status;

    @Column(name = "manager_Username")
    private String managerUsername;

    public long getRequestId() {
        return requestId;
    }

    public void setRequestId(long requestId) {
        this.requestId = requestId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getConcepts() {
        return concepts;
    }

    public void setConcepts(String concepts) {
        this.concepts = concepts;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getEmployeePosition() {
        return employeePosition;
    }

    public void setEmployeePosition(String employeePosition) {
        this.employeePosition = employeePosition;
    }

    public List<Employee> getRequiredEmployees() {
        return requiredEmployees;
    }

    public void setRequiredEmployees(List<Employee> requiredEmployees) {
        this.requiredEmployees = requiredEmployees;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public String getManagerUsername() {
        return managerUsername;
    }

    public void setManagerUsername(String managerUsername) {
        this.managerUsername = managerUsername;
    }

    @Override
    public String toString() {
        return "TrainingRequest{" +
                "requestId=" + requestId +
                ", courseName='" + courseName + '\'' +
                ", description='" + description + '\'' +
                ", concepts='" + concepts + '\'' +
                ", duration='" + duration + '\'' +
                ", employeePosition='" + employeePosition + '\'' +
                ", requiredEmployees=" + requiredEmployees +
                ", status=" + status +
                ", managerUsername='" + managerUsername + '\'' +
                '}';
    }
}
