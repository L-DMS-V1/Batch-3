package com.example.LearningAndDevelopment.service;

import com.example.LearningAndDevelopment.model.Assignment;
import com.example.LearningAndDevelopment.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    // Assign a course to an employee
    public Assignment assignCourseToEmployee(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    // Get all assignments
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    // Get an assignment by ID
    public Optional<Assignment> getAssignmentById(Long id) {
        return assignmentRepository.findById(id);
    }

    // Delete an assignment by ID
    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}

