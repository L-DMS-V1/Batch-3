package com.example.LearningAndDevelopment.Model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "assessment_table1")
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assessmentId;

    @OneToOne
    @JoinColumn(name = "courseId", referencedColumnName = "courseId")
    private Course course;

    // ManyToMany relationship
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "question_mapping",  // Join table name
            joinColumns = @JoinColumn(name = "assessment_id"),  // Foreign key for TrainingRequest
            inverseJoinColumns = @JoinColumn(name = "question_id")   // Foreign key for Employee
    )
    private List<AssessmentQuestion> questions;

    private int totalMarks;
    private int passingMarks;
//    private int score;  // Add score field

    // New fields
//    private String assessmentType;  // Add assessment type
    private int duration;  // Add duration

    // Getters and Setters
    public Long getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(Long assessmentId) {
        this.assessmentId = assessmentId;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<AssessmentQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<AssessmentQuestion> questions) {
        this.questions = questions;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public int getPassingMarks() {
        return passingMarks;
    }

    public void setPassingMarks(int passingMarks) {
        this.passingMarks = passingMarks;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
