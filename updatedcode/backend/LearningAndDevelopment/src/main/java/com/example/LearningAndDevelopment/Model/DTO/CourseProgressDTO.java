package com.example.LearningAndDevelopment.Model.DTO;


import jakarta.validation.constraints.NotBlank;

public class CourseProgressDTO {
    @NotBlank(message = "Employee Id is Mandatory")
    private Long employeeId;

    @NotBlank(message = "Course Id is Mandatory")
    private Long courseId;

    @NotBlank(message = "Progress Percentage is Mandatory")
    private Long progressPercentage;

    @NotBlank(message = "Status is Mandatory")
    private String status;

    public @NotBlank(message = "Employee Id is Mandatory") Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(@NotBlank(message = "Employee Id is Mandatory") Long employeeId) {
        this.employeeId = employeeId;
    }

    public @NotBlank(message = "Course Id is Mandatory") Long getCourseId() {
        return courseId;
    }

    public void setCourseId(@NotBlank(message = "Course Id is Mandatory") Long courseId) {
        this.courseId = courseId;
    }

    public @NotBlank(message = "Progress Percentage is Mandatory") Long getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(@NotBlank(message = "Progress Percentage is Mandatory") Long progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public @NotBlank(message = "Status is Mandatory") String getStatus() {
        return status;
    }

    public void setStatus(@NotBlank(message = "Status is Mandatory") String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CourseProgressDTO{" +
                "employeeId=" + employeeId +
                ", courseId=" + courseId +
                ", progressPercentage=" + progressPercentage +
                ", status='" + status + '\'' +
                '}';
    }
}