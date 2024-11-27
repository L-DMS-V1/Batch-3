package com.example.LearningAndDevelopment.Model.DTO;


import jakarta.validation.constraints.NotBlank;

public class CourseAssignmentDTO {

    @NotBlank(message = "Employee Id should not be blank")
    private Long employeeId;

    @NotBlank(message = "Course Id should not be blank")
    private Long courseId;

    @NotBlank(message = "Status should not be blank")
    private String status;

    @NotBlank(message = "Deadline should not be blank")
    private String deadline;

    public @NotBlank(message = "Employee Id should not be blank") Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(@NotBlank(message = "Employee Id should not be blank") Long employeeId) {
        this.employeeId = employeeId;
    }

    public @NotBlank(message = "Course Id should not be blank") Long getCourseId() {
        return courseId;
    }

    public void setCourseId(@NotBlank(message = "Course Id should not be blank") Long courseId) {
        this.courseId = courseId;
    }

    public @NotBlank(message = "Status should not be blank") String getStatus() {
        return status;
    }

    public void setStatus(@NotBlank(message = "Status should not be blank") String status) {
        this.status = status;
    }

    public @NotBlank(message = "Deadline should not be blank") String getDeadline() {
        return deadline;
    }

    public void setDeadline(@NotBlank(message = "Deadline should not be blank") String deadline) {
        this.deadline = deadline;
    }

    @Override
    public String toString() {
        return "CourseAssignmentDTO{" +
                "employeeId=" + employeeId +
                ", courseId=" + courseId +
                ", status='" + status + '\'' +
                ", deadline='" + deadline + '\'' +
                '}';
    }
}