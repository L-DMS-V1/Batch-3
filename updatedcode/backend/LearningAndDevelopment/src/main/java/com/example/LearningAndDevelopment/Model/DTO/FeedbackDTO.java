package com.example.LearningAndDevelopment.Model.DTO;

public class FeedbackDTO {
    private Long employeeId;
    private Long courseId;
    private int rating;
    private String feedBackEnum;
    private String comment;

    // Getters and Setters
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getFeedBackEnum() {
        return feedBackEnum;
    }

    public void setFeedBackEnum(String feedBackEnum) {
        this.feedBackEnum = feedBackEnum;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
}