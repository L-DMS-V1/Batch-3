package com.example.LearningAndDevelopment.Model.DTO;



import com.example.LearningAndDevelopment.Model.Employee;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class TrainingRequestDTO {

    @NotBlank(message = "Course name is mandatory")
    private String courseName;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotBlank(message = "Concepts is mandatory")
    private String concepts;

    @NotBlank(message = "Duration is mandatory")
    private String duration;
//
//    @NotBlank(message = "Employee Position is mandatory")
//    private String employeePosition;

    //    @NotBlank(message = "Required Employees is mandatory")
//    private List<EmployeeDTO> requiredEmployees;

    public @NotBlank(message = "Course name is mandatory") String getCourseName() {
        return courseName;
    }

    public void setCourseName(@NotBlank(message = "Course name is mandatory") String courseName) {
        this.courseName = courseName;
    }

    public @NotBlank(message = "Description is mandatory") String getDescription() {
        return description;
    }

    public void setDescription(@NotBlank(message = "Description is mandatory") String description) {
        this.description = description;
    }

    public @NotBlank(message = "Concepts is mandatory") String getConcepts() {
        return concepts;
    }

    public void setConcepts(@NotBlank(message = "Concepts is mandatory") String concepts) {
        this.concepts = concepts;
    }

    public @NotBlank(message = "Duration is mandatory") String getDuration() {
        return duration;
    }

    public void setDuration(@NotBlank(message = "Duration is mandatory") String duration) {
        this.duration = duration;
    }

//    public @NotBlank(message = "Employee Position is mandatory") String getEmployeePosition() {
//        return employeePosition;
//    }
//
//    public void setEmployeePosition(@NotBlank(message = "Employee Position is mandatory") String employeePosition) {
//        this.employeePosition = employeePosition;
//    }
//
//    public List<EmployeeDTO> getRequiredEmployees() {
//        return requiredEmployees;
//    }
//
//    public void setRequiredEmployees(List<EmployeeDTO> requiredEmployees) {
//        this.requiredEmployees = requiredEmployees;
//    }

    @Override
    public String toString() {
        return "TrainingRequestDTO{" +
                "courseName='" + courseName + '\'' +
                ", description='" + description + '\'' +
                ", concepts='" + concepts + '\'' +
                ", duration='" + duration + '\'' +
                '}';
    }
}
