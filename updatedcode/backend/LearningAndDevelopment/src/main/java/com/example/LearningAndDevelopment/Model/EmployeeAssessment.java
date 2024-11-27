package com.example.LearningAndDevelopment.Model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EmployeeAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeAssessmentId;

    @ManyToOne
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "assessmentId", referencedColumnName = "assessmentId")
    private Assessment assessment;

    private int score;

    @Enumerated(EnumType.STRING)
    private AssessmentResult result;

    private LocalDateTime attemptedDate;

    // Getters and Setters
    public Long getEmployeeAssessmentId() {
        return employeeAssessmentId;
    }

    public void setEmployeeAssessmentId(Long employeeAssessmentId) {
        this.employeeAssessmentId = employeeAssessmentId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public AssessmentResult getResult() {
        return result;
    }

    public void setResult(AssessmentResult result) {
        this.result = result;
    }

    public LocalDateTime getAttemptedDate() {
        return attemptedDate;
    }

    public void setAttemptedDate(LocalDateTime attemptedDate) {
        this.attemptedDate = attemptedDate;
    }
}
