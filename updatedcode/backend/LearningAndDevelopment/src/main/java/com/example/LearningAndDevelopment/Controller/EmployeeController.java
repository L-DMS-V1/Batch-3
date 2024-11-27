package com.example.LearningAndDevelopment.Controller;



import com.example.LearningAndDevelopment.Model.CourseAssignment;
import com.example.LearningAndDevelopment.Model.DTO.UserDTO;
import com.example.LearningAndDevelopment.Model.Employee;
import com.example.LearningAndDevelopment.Model.EmployeeAssessment;
import com.example.LearningAndDevelopment.Repository.UserRepository;
import com.example.LearningAndDevelopment.Service.AssessmentService;
import com.example.LearningAndDevelopment.Service.CourseAssignmentService;
import com.example.LearningAndDevelopment.Service.EmployeeService;
import com.example.LearningAndDevelopment.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasRole('EMPLOYEE')")
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CourseAssignmentService courseAssignmentService;

    @Autowired
    private AssessmentService assessmentService;

//    @PostMapping
//    public ResponseEntity<String> createEmployee(@RequestBody UserDTO userDTO) {
//        userService.createUser(userDTO);
//        return new ResponseEntity<>("Added Employee Successfully", HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public List<Employee> getAllEmployees() {
//        return employeeService.getAllEmployees();
//    }

    @GetMapping("/getAssignments")
    public ResponseEntity<List<CourseAssignment>> getEmployeeAssignments() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<CourseAssignment> courseAssignmentList = courseAssignmentService.getAssignmentsByUsername(username);
        return new ResponseEntity<>(courseAssignmentList,HttpStatus.OK);
    }

    @GetMapping("/get-employee-assessments")
    public ResponseEntity<List<EmployeeAssessment>> getEmployeeAssessments() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<EmployeeAssessment> employeeAssessmentList = assessmentService.getAssessmentsByUsername(username);
        return new ResponseEntity<>(employeeAssessmentList,HttpStatus.OK);
    }
}