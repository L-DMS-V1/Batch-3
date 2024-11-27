package com.example.LearningAndDevelopment.controller;

import com.example.LearningAndDevelopment.model.Assignment;
import com.example.LearningAndDevelopment.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    // Create a new Assignment and assign a Course to an Employee
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Assignment assignCourseToEmployee(@RequestBody @Valid Assignment assignment) {
        return assignmentService.assignCourseToEmployee(assignment);
    }

    // Get all assignments
    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    // Get a specific assignment by ID
    @GetMapping("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id) {
        return assignmentService.getAssignmentById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found with id " + id));
    }

    // Update an existing assignment by ID
    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id, @RequestBody @Valid Assignment assignment) {
        Optional<Assignment> existingAssignment = assignmentService.getAssignmentById(id);

        if (existingAssignment.isPresent()) {
            Assignment currentAssignment = existingAssignment.get();
            currentAssignment.setCourseName(assignment.getCourseName());
            currentAssignment.setCourseLevel(assignment.getCourseLevel());
            currentAssignment.setDuration(assignment.getDuration());
            currentAssignment.setEmployeeName(assignment.getEmployeeName());
            currentAssignment.setLink(assignment.getLink());
            currentAssignment.setStatus(assignment.getStatus());
            currentAssignment.setDeadline(assignment.getDeadline());
            return assignmentService.assignCourseToEmployee(currentAssignment);
        } else {
            throw new RuntimeException("Assignment not found with id " + id);
        }
    }

    // Delete an assignment by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
    }
}
