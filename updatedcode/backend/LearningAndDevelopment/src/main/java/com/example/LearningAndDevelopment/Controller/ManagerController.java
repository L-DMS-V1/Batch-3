package com.example.LearningAndDevelopment.Controller;


import com.example.LearningAndDevelopment.Model.DTO.TrainingRequestDTO;
import com.example.LearningAndDevelopment.Model.Employee;
import com.example.LearningAndDevelopment.Model.TrainingRequest;
import com.example.LearningAndDevelopment.Service.EmployeeService;
import com.example.LearningAndDevelopment.Service.ManagerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@PreAuthorize("hasRole('MANAGER')")
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/createRequest")
    public ResponseEntity<String> createRequest(@Valid @RequestBody TrainingRequestDTO trainingRequestDTO) {
        managerService.requestForm(trainingRequestDTO);
        return new ResponseEntity<>("Request created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/getRequests")
    public ResponseEntity<List<TrainingRequest>> getRequests() {
        // Get the username of the authenticated user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<TrainingRequest> trainingRequests = managerService.getRequestByManagerName(username);
        return ResponseEntity.ok(trainingRequests);
    }

    @GetMapping("/getRequest/{id}")
    public ResponseEntity<TrainingRequest> getRequest(@PathVariable("id") Long requestId) {
        TrainingRequest trainingRequest = managerService.getRequestByRequestId(requestId);
        return ResponseEntity.ok(trainingRequest);
    }

    @GetMapping("/getAllEmployees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

}
