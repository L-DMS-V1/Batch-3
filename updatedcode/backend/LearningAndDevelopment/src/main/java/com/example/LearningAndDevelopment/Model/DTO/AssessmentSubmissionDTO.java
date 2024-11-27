package com.example.LearningAndDevelopment.Model.DTO;



import java.util.List;

public class AssessmentSubmissionDTO {
    private Long assessmentId;
    private Long employeeId;
    private List<String> answers;
//    private int score;

    // Getters and Setters
    public Long getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(Long assessmentId) {
        this.assessmentId = assessmentId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}