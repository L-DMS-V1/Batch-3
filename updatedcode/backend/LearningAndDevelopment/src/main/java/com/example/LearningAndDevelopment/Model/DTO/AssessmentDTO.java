package com.example.LearningAndDevelopment.Model.DTO;



import java.util.List;

public class AssessmentDTO {
    private Long courseId;
    private List<AssessmentQuestionDTO> questions;
    private int totalMarks;
    private int passingMarks;
    private int duration;  // Add duration field

    // Getters and Setters
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public List<AssessmentQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<AssessmentQuestionDTO> questions) {
        this.questions = questions;
    }

    public int getPassingMarks() {
        return passingMarks;
    }

    public void setPassingMarks(int passingMarks) {
        this.passingMarks = passingMarks;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}